import { useState } from 'react'
import '../../styles/Admin/createCategory.css'
import { useSweetAlert } from '../../Hooks/sweetAlertHook'
import { createCategory } from '../../Api/Api'

export const CreateCategoryComponent = () => {

  const [category, setCategory] = useState({
    title: '',
    description: '',    
    categoryType: ''
  })

  const [errors, setErrors] = useState({})

  const [loading, setLoading] = useState(false)

  const { showSuccess, showError } = useSweetAlert()

  const validate = () => {
    const newErrors = {}

    //Validación de nombre
    if (!category.title.trim()) {
      newErrors.title = 'El nombre de la categoria es obligatorio.'
    } else if (category.title.trim().length < 3) {
      newErrors.title = 'El nombre de la categoria debe tener al menos 3 caracteres.'
    }

    //Validación de descripción
    if (!category.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.'
    } else if (category.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres.'
    }   

    return newErrors

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setErrors({})
    setLoading(true)

    const formData = new FormData()

    formData.append('title', category.title)
    formData.append('description', category.description)
    formData.append('categoryType', category.categoryType)    

    try {
      await createCategory(formData)
      showSuccess('Categoría agregada exitosamente')

      setCategory({
        title: '',
        description: '',        
        categoryType: ''
      })      

    } catch (err) {      

      const status = err.response?.status
      const backendMessage = err.response?.data?.message || err.response?.data

      if (status === 400 || status === 409) {        
        showError(backendMessage || 'Ya existe una categoría con ese título. Intenta nuevamente')
      } else {
        showError(backendMessage || 'Ocurrió un error al crear la categoría. Intenta nuevamente')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='main-ctgr-container'>
      <div className='ctg-title'>
        <h2>Crear nueva categoría</h2>
      </div>

      <div className='ctg-container'>
        <div className='ctgr-form'>
          <label htmlFor="título">Título</label>
          <input
            type="text"
            id='título'
            name='título'
            value={category.title}
            onChange={(e) => {
              setCategory({ ...category, title: e.target.value })
              if (errors.title) setErrors({ ...errors, title: null })
            }}
          />
          {errors.title && <span className='error-message'>{errors.title}</span>}
        </div>

        <div className='ctgr-form'>
          <label htmlFor="descripción">Descripción</label>
          <textarea
            type="text"
            id='descripción'
            name='descripción'
            value={category.description}
            onChange={(e) => {
              setCategory({ ...category, description: e.target.value })
              if (errors.description) setErrors({ ...errors, description: null })
            }}
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>        

        <div className='ctgr-form'>
          <label htmlFor="seleccion">Selecciona si la categoría es para Room o Amenity</label>
          <select
            id="seleccion"
            value={category.categoryType}
            onChange={(e) => setCategory({ ...category, categoryType: e.target.value })}
          >
            <option value="" disabled>Selecciona un tipo</option>
            <option value="ROOM">Room</option>
            <option value="AMENITY">Amenity</option>
          </select>
        </div>

        <button type="submit" className='ctgr-submitt-btn' disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar categoría'}
        </button>
      </div>
    </form>
  )
}
