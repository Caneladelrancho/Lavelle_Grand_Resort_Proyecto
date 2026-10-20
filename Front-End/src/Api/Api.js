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

//---------------USERS------------------//

export const getAllUsers = async () =>{
    const response = await api.get('/admin/users')
    return response.data
}

export const updateUser = async (id, role) =>{
    const response = await api.put(`/admin/users/${id}/role`, {role})
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

//Actualzar room 
export const updateRoom = async (id, formData) =>{
    const response = await api.put(`/rooms/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
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

//Actualizar Amenity
export const updateAmenity = async (id, formData) =>{
    const response = await api.put(`amenities/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}


//--------------CATEGORIES------------//
export const createCategory = async(categoryData) =>{
    const response = await api.post('/categories/add', categoryData)
    return response.data
}

export const getAllCategories = async() =>{
    const response = await api.get('/categories')
    return response.data
}

export const deleteCategory = async(id) =>{
    const response = await api.delete(`/categories/${id}`)
    
}

//---------CARACTERISTICAS-----------//
export const createCharacteristic = async(characteristicData) =>{
    const response = await api.post('/characteristics/add', characteristicData)
    return response.data
}

export const getAllCharacteristics = async() =>{
    const response = await api.get('/characteristics')
    return response.data
} 

export const deleteCharacteristics = async(id) =>{
    const response = await api.delete(`/characteristics/${id}`)
    return response.data
}

export const updateCharacteristic = async(id, characteristicData) =>{
    const response = await api.put(`/characteristics/${id}`, characteristicData)
    return response.data
}