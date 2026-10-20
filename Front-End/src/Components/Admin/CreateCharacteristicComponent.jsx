import { useState } from 'react'
import '../../styles/Admin/createCharacteristic.css'
import { useSweetAlert } from '../../Hooks/sweetAlertHook'
import { createCharacteristic } from '../../Api/Api'
import { iconOptions } from '../../utils/iconOptions'



export const CreateCharacteristicComponent = () => {

  const [characteristic, setCharacteristic] = useState({
    name: '',
    icon: ''
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { showSuccess, showError } = useSweetAlert()

  const validate = () => {

    const newErrors = {}

    if (!characteristic.name.trim()) {
      newErrors.name = 'El nombre de la caracteristica es obligatorio.'
    } else if (characteristic.name.trim().length < 3) {
      newErrors.name = 'El nombre de la caracteristica debe tener al menos 3 caracteres.'
    }

    if (!characteristic.icon) {
      newErrors.icon = 'El icono es obligatorio. Por favor selecciona un icono.'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return //para el proceso y no deja que salte al siguiente bloque de codigo
    }

    setErrors({})
    setLoading(true)

    try {

      await createCharacteristic(characteristic)
      showSuccess('Caracteristica agregada exitosamente')

      setCharacteristic({
        name: '',
        icon: ''
      })

    } catch (err) {

      const status = err.response?.status
      const backEndMessage = err.response?.data?.message || err.response?.data

      if (status === 400 || status === 409) {
        showError(backEndMessage || 'Ya existe una caracteristica con ese nombre. Intenta nuevamente')
      } else {
        showError(backEndMessage || 'Ocurrió un error al crear la caracteristica. Intenta nuevamente')
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <form onSubmit={handleSubmit} className='main-char-container'>
      <div className='char-title'>
        <h2>Crear nueva característica</h2>
      </div>

      <div className='char-container'>

        <div className='char-form'>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={characteristic.name}
            onChange={(e) => {
              setCharacteristic({ ...characteristic, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: null })
            }}
          />
          {errors.name && <span className='error-message'>{errors.name}</span>}
        </div>

        <div className='char-form'>
          <label htmlFor="icon">Ícono</label>
          <select
            id="icon"
            value={characteristic.icon}
            onChange={(e) => {
              setCharacteristic({ ...characteristic, icon: e.target.value })
              if (errors.icon) setErrors({ ...errors, icon: null })
            }}
          >
            <option value="" disabled>Selecciona un ícono</option>
            {iconOptions.map((opt) => (
              <option key={opt.iconKey} value={opt.iconKey}>
                {opt.iconKey}
              </option>
            ))}
          </select>
          {errors.icon && <span className='error-message'>{errors.icon}</span>}
        </div>

        <button type='submit' className='char-submitt-btn' disabled={loading}>
          {loading ? 'Agregando...' : 'Agregar característica'}
        </button>

      </div>
    </form>
  )
}
