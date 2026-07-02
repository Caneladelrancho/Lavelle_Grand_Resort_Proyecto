import { useState } from "react"
import { createRoom, createAmenity } from '../../Api/Api'
import { UseSweetAlert } from '../../Hooks/sweetAlertHook';
import '../../styles/Admin/addProduct.css'


export const AddProductComponent = () => {

    const [product, setProduct] = useState({
        type: 'room',
        name: '',
        description: '',
        images: [],
        needsReservation: false
    })

    const [errors, setErrors] = useState({})

    const [loading, setLoading] = useState(false)

    const { showSuccess, showError } = UseSweetAlert()

    const validate = () => {
        const newErrors = {}

        //Validación de nombre
        if (!product.name.trim()) {
            newErrors.name = 'El nombre del producto es obligatorio.'
        } else if (product.name.trim().length < 3) {
            newErrors.name = 'El nombre debe tener al menos 3 caracteres.'
        }

        //Validación de descripción
        if (!product.description.trim()) {
            newErrors.description = 'La descripción es obligatoria.'

        } else if (product.description.trim().length < 10) {
            newErrors.description = 'La descripción debe tener al menos 10 caracteres.'
        }

        //Validación de imágenes
        if (!product.images || product.images.length === 0) {
            newErrors.images = 'Debes seleccionar a menos una imagen.'
        } else {
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png']
            const maxSizeInBytes = 50 * 1024 * 1024


            const imageArray = Array.from(product.images)

            const hasInvalidType = imageArray.some(img => !allowedTypes.includes(img.type))
            const hasInvalidSize = imageArray.some(img => img.size > maxSizeInBytes)

            if (hasInvalidType) {
                newErrors.images = 'Solo se permiten imágenes en formato JPG, JPEG o PNG.'

            } else if (hasInvalidSize) {
                newErrors.images = 'Cada imagen debe pesar máximo 50MB.'
            }
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

        console.log('Formulario enviado', product);

        // Crear FormData
        const formData = new FormData()
        formData.append('name', product.name)
        formData.append('description', product.description)

        // Agregar cada imagen
        if (product.images && product.images.length > 0) {
            Array.from(product.images).forEach(image => {
                formData.append('images', image)
            })
        }

        try {
            if (product.type === 'room') {
                await createRoom(formData)
                showSuccess('!Habitación agregada exitosamente!')
            } else {
                // Es amenity
                formData.append('needsReservation', product.needsReservation ? 'true' : 'false')
                await createAmenity(formData)
                showSuccess('!Servicio agregado exitosamente!')
            }

            setProduct({ //resetear formulario
                type: 'room',
                name: '',
                description: '',
                images: [],
                requiresReservation: false
            });

            document.getElementById('imagenes').value = ''

        } catch (err) {
            console.error('error completo:', err);
            console.error('mensaje:', err.message);
            showError('Ya existe un producto con ese nombre. Intenta nuevamente')
        } finally {
            setLoading(false)
        }
    }


    return (

        <form onSubmit={handleSubmit} className="main-form-container">
            <div className="form-title">
                <h2>Agregar nuevo producto</h2>
            </div>

            <div className="form-container">
                <div className="category-form">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        id='nombre'
                        name='nombre'
                        value={product.name}
                        onChange={(e) => {
                            setProduct({ ...product, name: e.target.value })
                            if (errors.name) setErrors({ ...errors, name: null })
                        }}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="category-form">
                    <label htmlFor="descripción">Descripción</label>
                    <textarea
                        type="text"
                        id='descripción'
                        name='descripción'
                        value={product.description}
                        onChange={(e) => {
                            setProduct({ ...product, description: e.target.value })
                            if (errors.description) setErrors({ ...errors, description: null })
                        }}
                    />
                    {errors.description && <span className="error-message">{errors.description}</span>}
                </div>

                <div className="category-form">
                    <label htmlFor="imagenes">Adjuntar imágenes</label>
                    <input
                        type="file"
                        id='imagenes'
                        name='imagenes'
                        onChange={(e) => {
                            setProduct({ ...product, images: e.target.files })
                            if (errors.images) setErrors({ ...errors, images: null })
                        }}
                        accept='.jpeg, .png, .jpg'
                        multiple
                    />
                    {errors.images && <span className="error-message">{errors.images}</span>}
                </div>

                <div className="category-form">
                    <label htmlFor="tipo">Tipo de producto</label>
                    <select
                        id="tipo"
                        value={product.type}
                        onChange={(e) => setProduct({ ...product, type: e.target.value })}
                    >
                        <option value="room">Habitación</option>
                        <option value="amenity">Amenity</option>
                    </select>
                </div>

                {/* Checkbox SOLO aparece si es amenity */}
                {product.type === 'amenity' && (
                    <div className="category-form checkbox">
                        <label htmlFor="needsReservation">¿Requiere reserva?</label>
                        <input
                            type="checkbox"
                            id="needsReservation"
                            checked={product.needsReservation || false}
                            onChange={(e) => setProduct({ ...product, needsReservation: e.target.checked })}
                        />
                    </div>
                )}

                <button type="submit" className="submitt-button" disabled={loading}>
                    {loading ? 'Agregando...' : 'Agregar producto'}
                </button>
            </div>
        </form>
    )
}
