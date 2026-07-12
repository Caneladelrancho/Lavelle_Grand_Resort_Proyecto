import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useState } from "react"


const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(localStorage.getItem("token") || null)

    const [user, setUser] = useState(() => {
        const savedToken = localStorage.getItem("token")
        return savedToken ? jwtDecode(savedToken) : null
    })

    const login = (newToken) => {
        localStorage.setItem("token", newToken)
        setToken(newToken)
        setUser(jwtDecode(newToken))
    }

    const logout = () => {
        localStorage.removeItem("token")
        setToken(null)
        setUser(null)
    }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
