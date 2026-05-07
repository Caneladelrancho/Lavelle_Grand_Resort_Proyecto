import { useEffect, useState } from "react"
import { UseSweetAlert } from "../../Hooks/sweetAlertHook"
import { deleteAmenity, deleteRoom, getAllAmenitiesForAdmin, getAllRoomsForAdmin } from "../../Api/Api"
import '../../styles/Admin/productList.css'


export const ProductListComponent = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  //Funciones de sweetAlert
  const {showConfirm, showSuccess, showError} = UseSweetAlert()

  //Cuando se monta el componente, se carga los productos
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async() => {
    setLoading(true)
    setError('')
    try{
      //promise.all para llamar a ambos endpoints en vez de llamarlos separadamente
      const[rooms, amenities] = await Promise.all([
        getAllRoomsForAdmin(),
        getAllAmenitiesForAdmin()
      ])

      console.log('Rooms:', rooms)
      console.log('Amenities:', amenities)

      const roomsWithType = rooms.map(r => ({...r, type: 'room'}))
      const amenitiesWithType = amenities.map(a => ({...a, type: 'amenity'}))

      setProducts([...roomsWithType, ...amenitiesWithType])   
      
      
    }catch (err){
      setError('Error al cargar los productos.')
      console.error(err);      
    }finally{
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
      }else{
        await deleteAmenity(id)
      }

      await fetchProducts()
      showSuccess('El producto fue eliminado exitosamente.')
      
    } catch (err) {
      showError('Error al eliminar el producto. Intenta nuevamete.')
      console.error(err);      
    }
  }

  if (loading) return <div className="product-list-status">Cargando productos...</div>
  if (error) return <div className="product-list-status error">{error}</div>
  
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
                <td className={`type-bafge ${product.type}`}>
                  {product.type === 'room' ? 'Habitación' : 'Amenity'}
                </td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(product.id, product.type, product.name)}>
                    Eliminar producto
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>      
        )}
    </div>
  )
}
