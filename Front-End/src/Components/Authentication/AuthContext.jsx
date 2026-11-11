import { jwtDecode } from "jwt-decode"
import { createContext, useContext, useState } from "react"


const AuthContext = createContext(null)

const getValidToken = ()=>{

    const getToken = localStorage.getItem("token")

    if (!getToken) {
       return null
    }

    try {
        const decodedToken = jwtDecode(getToken)

        if (!Number.isFinite(decodedToken.exp)) {
            localStorage.removeItem("token") 
            return null           
        }

        const currentDate = Date.now()
        const expirationDate = decodedToken.exp * 1000

        if (currentDate > expirationDate) {
            localStorage.removeItem("token")
            return null           
        }

        return getToken
        
    } catch (error) {
        localStorage.removeItem("token")
        return null           
    }
}

export const AuthProvider = ({children}) => {

    const [token, setToken] = useState(getValidToken())

    const [user, setUser] = useState(() => {
        const savedToken = getValidToken()
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
