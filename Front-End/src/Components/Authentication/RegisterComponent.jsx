import { useState } from "react"
import { UseSweetAlert } from "../../Hooks/sweetAlertHook"
import { useAuth } from "./AuthContext"
import { useNavigate } from "react-router-dom"
import { registerUser } from "../../Api/Api"
import '../../styles/User/register.css'


export const RegisterComponent = () => {

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const { showError } = UseSweetAlert()
  const { login } = useAuth()
  const navigate = useNavigate()



  const validate = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres"
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "El apellido es obligatorio"
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = "El apellido debe tener al menos 2 caracteres"
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email debe tener un formato valido"
    }

    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria"
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres"
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "La contraseña debe contener al menos una mayúscula y un número"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
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

    try {
      const data = await registerUser({
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      })
      login(data.token)
      navigate("/profile")

    } catch (err) {
      //Manejo de errores de mi global exception
      // - 409, el email ya existe
      // - 400, errores de validacion
      if (err.response?.status === 409) {
        showError(err.response.data)
      } else if (err.response?.status === 400) {
        const backendErrors = err.response.data
        const firstError = Object.values(backendErrors)[0]
        showError(firstError)
      } else {
        showError("Ocurrió un error al registrarte. Intenta nuevamente.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">

      {/*PARTE IZQUIERDA*/}

      <div className="register-form-panel">
        <div className="register-form-container">

          <div className="register-header">
            <h1 className="register-title">Bienvenido a una experiencia inolvidable</h1>
            <p>Completa tu registro y descubre un mundo de lujo, confort y experiencias diseñadas especialmente para ti.</p>
          </div>

          <form className="register-form" onSubmit={handleSubmit}>

            <div className="form-group-register">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className={`form-input-register ${errors.name ? "input-error" : ''}`}
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: null })
                }}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group-register">
              <label className="form-label">Apellido</label>
              <input
                type="text"
                className={`form-input-register ${errors.lastName ? "input-error" : ''}`}
                placeholder="Tu apellido"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value })
                  if (errors.lastName) setErrors({ ...errors, lastName: null })
                }}
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>

            <div className="form-group-register">
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className={`form-input-register ${errors.email ? "input-error" : ''}`}
                placeholder="correo@lavelle.com"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: null })
                }}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group-register">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className={`form-input-register ${errors.password ? "input-error" : ''}`}
                placeholder="**********"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value })
                  if (errors.password) setErrors({ ...errors, password: null })
                }}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group-register">
              <label className="form-label">Confirmar contraseña</label>
              <input
                type="password"
                className={`form-input-register ${errors.confirmPassword ? "input-error" : ''}`}
                placeholder="**********"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value })
                  if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: null })
                }}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>

      {/*PARTE DERECHA*/}
      <div className="right-image-panel">
        <div className="right-image"></div>
      </div>
    </div>
  )
}

