import axios from "axios";

const API_BASE_URL = 'http://localhost:8080/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

api.interceptors.response.use(
    (response) => response, 
    
    (error) => {
        const isLoginRequest = error.config?.url?.includes('/auth/login')

        if (error.response?.status === 401 && !isLoginRequest){
            localStorage.removeItem('token')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }

)

//--------------AUTENTICACIÓN---------------//

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', {email, password})
    return response.data
}

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
}

export const registerAdmin = async (userData) => {
    const response = await api.post('/admin/register', userData)
    return response.data
}

//--------------ROOMS---------------//

//Crear room con imagenes
export const createRoom = async (formData) =>{
    const response = await api.post('/rooms/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

//Obtener rooms para el usuario
export const getAllRooms = async () =>{
    const response = await api.get('/rooms')
    return response.data
}

//Obtener rooms para admin 
export const getAllRoomsForAdmin = async () =>{
    const response = await api.get('/rooms/admin')
    return response.data
}

//Eliminar habitacion 
export const deleteRoom = async (id) =>{
    const response = await api.delete(`/rooms/${id}`)
    return response.data
}

//------------------AMENITIES-----------------//

//Crear amenity con imagenes 
export const createAmenity = async (formData) =>{
    const response = await api.post('amenities/add', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

//Obtener amenities 
export const getAllAmenities = async () =>{
    const response = await api.get('/amenities')
    return response.data
}

//Obtener amenities admin 
export const getAllAmenitiesForAdmin = async () =>{
    const response = await api.get('/amenities/admin')
    return response.data
}  

//Eliminar amenity 
export const deleteAmenity = async (id) =>{
    const response = await api.delete(`/amenities/${id}`)
    return response.data
}