import { useEffect, useState } from "react"
import { useSweetAlert } from "../../Hooks/sweetAlertHook"
import { deleteAmenity, deleteRoom, getAllAmenitiesForAdmin, getAllRoomsForAdmin, updateAmenity, updateRoom } from "../../Api/Api"
import '../../styles/Admin/productList.css'
import { useCategories } from "../../Hooks/useCategories"
import { useCharacteristics } from "../../Hooks/useCharacteristics"
import { iconOptions } from "../../utils/iconOptions";


export const ProductListComponent = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState({})
  const [fetchError, setFetchError] = useState('')
  const [editingProduct, setEditingProduct] = useState(null)//el objeto completo que viene del backend
  const [updateLoading, setUpdateLoading] = useState(false)

  //Funciones de sweetAlert
  const { showConfirm, showSuccess, showError } = useSweetAlert()

  const { categories, categoryLoading } = useCategories()
  const { characteristics, characteristicLoading } = useCharacteristics()

  const filterCategory = editingProduct ? categories.filter(category =>
    category.categoryType === editingProduct.type.toUpperCase()) : []

  //Cuando se monta el componente, se carga los productos
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    setLoading(true)
    setFetchError('')
    try {
      //promise.all para llamar a ambos endpoints en vez de llamarlos separadamente
      const [rooms, amenities] = await Promise.all([
        getAllRoomsForAdmin(),
        getAllAmenitiesForAdmin()
      ])

      console.log('Rooms:', rooms)
      console.log('Amenities:', amenities)

      const roomsWithType = rooms.map(r => ({ ...r, type: 'room' }))
      const amenitiesWithType = amenities.map(a => ({ ...a, type: 'amenity' }))

      setProducts([...roomsWithType, ...amenitiesWithType])


    } catch (err) {
      setFetchError('Error al cargar los productos.')
      console.error(err);
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, type, name) => {

    const confirmed = await showConfirm(
      '¿Eliminar producto?',
      `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede revertir.`
    )
    if (!confirmed) return

    try {
      if (type === 'room') {
        await deleteRoom(id)
      } else {
        await deleteAmenity(id)
      }

      await fetchProducts()
      showSuccess('El producto fue eliminado exitosamente.')

    } catch (err) {
      showError('Error al eliminar el producto. Intenta nuevamete.')
      console.error(err);
    }
  }

  const handleEditClick = (product) => {
    setEditingProduct(product)
  }

  const handleCloseModal = () => {
    setEditingProduct(null)
  }

  const validate = () => {
    const newErrors = {}

    if (!editingProduct.name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio.'
    } else if (editingProduct.name.trim().length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.'
    }

    if (!editingProduct.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.'
    } else if (editingProduct.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres.'
    }

    if (editingProduct.images !== undefined && editingProduct.images.length >= 1) {

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
      const maxSizeInBytes = 50 * 1024 * 1024

      const imageArray = Array.from(editingProduct.images)

      const hasInvalidType = imageArray.some(img => !allowedTypes.includes(img.type))
      const hasInvalidSize = imageArray.some(img => img.size > maxSizeInBytes)

      if (hasInvalidType) {
        newErrors.images = 'Solo se permiten imágenes en formato JPG, JPEG o PNG.'

      } else if (hasInvalidSize) {
        newErrors.images = 'Cada imagen debe pesar máximo 50MB.'
      }
    }

    if (!editingProduct.categoryResponseDto) {
      newErrors.categoryResponseDto = 'La categoría es obligatoria. Por favor escoge una.'
    }

    return newErrors

  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors)
      return
    }

    setError({})
    setUpdateLoading(true)

    try {

      const formData = new FormData()
      formData.append('name', editingProduct.name)
      formData.append('description', editingProduct.description)
      formData.append('categoryId', editingProduct.categoryResponseDto.id)

      if (editingProduct.images !== undefined && editingProduct.images.length >= 1) {
        Array.from(editingProduct.images).forEach(image => {
          formData.append('images', image)
        })
      }

      if (editingProduct.type === 'room') {
        const characteristicIds = editingProduct.characteristicResponseDtos.map(object => {
          return object.id
        })
        characteristicIds.forEach((charId) => formData.append('characteristicIds', charId))

        await updateRoom(editingProduct.id, formData)
      } else {
        formData.append('needsReservation', editingProduct.needsReservation ? 'true' : 'false')
        await updateAmenity(editingProduct.id, formData)
      }

      showSuccess(`Producto de tipo ${editingProduct.type === 'room' ? 'Habitación' : 'Amenity'} actualizado exitosamente.`)
      handleCloseModal()
      await fetchProducts()

    } catch (err) {
      showError(`Error al actualizar ${editingProduct.type === 'room' ? 'Habitación' : 'Amenity'}. Intenta nuevamente.`)
    } finally {
      setUpdateLoading(false)
    }
  }

  if (loading) return <div className="product-list-status">Cargando productos...</div>
  if (fetchError) return <div className="product-list-status-error">{fetchError}</div>

  return (
    <div className="product-list-container">
      <h2>Lista de productos</h2>

      {products.length === 0 ? (
        <p className="product-list">No hay productos registrados.</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={`${product.type}-${product.id}`}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td className={`type-badge ${product.type}`}>
                  {product.type === 'room' ? 'Habitación' : 'Amenity'}
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(product.id, product.type, product.name)}>
                    Eliminar producto
                  </button>

                  <button className="edit-product-btn" onClick={() => handleEditClick(product)}>
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingProduct && (
        <div className="modal-prod-overlay" onClick={handleCloseModal}>
          <form onSubmit={handleUpdateSubmit} className="prod-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="prod-modal-title">Editar productos</h2>

            <div className="prod-overlay-container">

              {/* NOMBRE */}
              <div className="prod-overlay-form">
                <label htmlFor="edit-name">Nombre</label>
                <input
                  type="text"
                  name="edit-name"
                  id="edit-name"
                  value={editingProduct.name}
                  onChange={(e) => {
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                    if (error.name) setError({ ...error, name: null })
                  }}
                />
                {error.name && <span className="error-message">{error.name}</span>}
              </div>

              {/* DESCRIPCION */}
              <div className="prod-overlay-form">
                <label htmlFor="edit-description">Descripción</label>
                <textarea
                  type="text"
                  id='edit-description'
                  name='edit-description'
                  value={editingProduct.description}
                  onChange={(e) => {
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                    if (error.description) setError({ ...error, description: null })
                  }}
                />
                {error.description && <span className="error-message">{error.description}</span>}
              </div>

              {/* MOSTRAR IMAGENES EXISTENTES*/}
              <div className="prod-overlay-form">
                <label>Imágenes actuales:</label>
                <div className="current-images">
                  {editingProduct.imagesUrl.map((url, indice) => (
                    <img key={indice} src={url} />
                  ))}
                </div>
              </div>

              {/* ADJUNTAR IMAGENES NUEVAS */}
              <div className="prod-overlay-form">
                <span className="updt-warning-message">¡Advertencia! solo se puede reemplazar todas las imágenes a la vez o dejar las imágenes actuales.</span>
                <label htmlFor="imagenes">Adjuntar imágenes</label>
                <input
                  type="file"
                  id='imagenes'
                  name='imagenes'
                  onChange={(e) => {
                    setEditingProduct({ ...editingProduct, images: e.target.files })
                    if (error.images) setError({ ...error, images: null })
                  }}
                  accept='.jpeg, .png, .jpg'
                  multiple
                />
                {error.images && <span className="error-message">{error.images}</span>}
              </div>

              {/* TIPO DE PRODUCTO */}
              <div className="prod-overlay-form">
                <label htmlFor="tipo">Tipo de producto</label>
                <select
                  id="tipo"
                  value={editingProduct.type}
                  onChange={(e) => setEditingProduct({ ...editingProduct, type: e.target.value })}
                >
                  <option value="room">Habitación</option>
                  <option value="amenity">Amenity</option>
                </select>
              </div>

              {/* Checkbox SOLO aparece si es amenity */}
              {editingProduct.type === 'amenity' && (
                <div className="prod-form-checkbox">
                  <label htmlFor="needsReservation">¿Requiere reserva?</label>
                  <input
                    type="checkbox"
                    id="needsReservation"
                    checked={editingProduct.needsReservation || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, needsReservation: e.target.checked })}
                  />
                </div>
              )}

              {/* CATEGORIAS */}
              <div className="prod-overlay-form">
                <label htmlFor="categoria">Selecciona la categoría</label>
                {categoryLoading ? (
                  <p className="ctgr-list-empty">Cargando categorías ...</p>
                ) : (
                  <select
                    id="categoria"
                    value={editingProduct.categoryResponseDto ? editingProduct.categoryResponseDto.id : ""}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryResponseDto: { id: e.target.value } })}
                  >
                    <option value="" disabled>Selecciona una categoría</option>

                    {filterCategory.map(category => (
                      <option key={category.id} value={category.id}>{category.title}</option>
                    ))}
                  </select>
                )}
                {error.categoryId && <span className="error-message">{error.categoryId}</span>}
              </div>

              {/* CARACTERISTICAS */}
              {editingProduct.type === 'room' && (
                <div className="prod-overlay-form">
                  <label>Selecciona las características:</label>
                  {characteristicLoading ? (
                    <p>Cargando características ...</p>
                  ) : (
                    <div className="upt-chars-list">
                      {characteristics.map(characteristic => {
                        const iconOption = iconOptions.find(opt => opt.iconKey === characteristic.icon)
                        const isChecked = editingProduct.characteristicResponseDtos.some((obj) => {
                          return obj.id === characteristic.id
                        })

                        return (
                          <label key={characteristic.id} className="characteristic-item">
                            <input
                              type="checkbox"
                              value={characteristic.id}
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {//marcar el checkbox
                                  setEditingProduct({
                                    ...editingProduct,
                                    characteristicResponseDtos: [...editingProduct.characteristicResponseDtos, characteristic]
                                  })
                                } else {
                                  setEditingProduct({//desmarcar el checkbox
                                    ...editingProduct,
                                    characteristicResponseDtos: editingProduct.characteristicResponseDtos.filter(charObject => charObject.id !== characteristic.id)
                                  })
                                }
                              }}

                            />
                            {iconOption && <iconOption.Icon size={20} />}
                            {characteristic.name}
                          </label>
                        )
                      })}
                    </div>
                  )}
                </div>
              )}

              <button className='prod-upt-btn' type='submit' disabled={updateLoading}>{updateLoading ? 'Guardando ...' : 'Actualizar producto'}</button>
              <button className='prod-cancel-btn' type='button' onClick={handleCloseModal}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
