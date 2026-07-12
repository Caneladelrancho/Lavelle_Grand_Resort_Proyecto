import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { loginUser } from "../../Api/Api"
import { UseSweetAlert } from "../../Hooks/sweetAlertHook"
import '../../styles/User/loginUsers.css'


export const LoginComponent = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { showError } = UseSweetAlert()

    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const data = await loginUser(email, password)
            login(data.token)

            const decoded = jwtDecode(data.token)
            console.log(decoded) 
            console.log(decoded.role)

            if (decoded.role === "ROLE_ADMIN") {
                navigate("/admin")
            } else {
                navigate("/profile")
            }
        } catch (err) {
            showError("Usuario o contraseña incorrectas. Intenta nuevamente.")

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page">

            {/*LADO IZQUIERDO*/}

            <div className="left-image-panel">
                <div className="left-image"></div>
            </div>

            {/*LADO DERECHO*/}
            <div className="login-form-panel">
                <div className="login-form-container">

                    <div className="login-header">
                        <h1 className="login-title">Bienvenido de nuevo</h1>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group-login">
                            <label className="form-label">Correo electronico</label>
                            <input
                                type="email"
                                className="form-input-login"
                                placeholder="login@lavelle.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group-login">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-input-login"
                                placeholder="*********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>


                        <button
                            type="submit"
                            className="login-btn"
                            disabled={loading}
                        >
                            {loading ? "Ingresando..." : "Ingresar"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
