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


    const [loading, setLoading] = useState(false)
    
    const { showSuccess, showError } = UseSweetAlert()

    const handleSubmit = async (e) => {

        e.preventDefault()
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
            showError('Error al agregar el producto. Intenta nuevamente')
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
                        onChange={(e) => setProduct({ ...product, name: e.target.value })}
                        required
                    />
                </div>

                <div className="category-form">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea
                        type="text"
                        id='descripcion'
                        name='descripcion'
                        value={product.description}
                        onChange={(e) => setProduct({ ...product, description: e.target.value })}
                        required
                    />
                </div>

                <div className="category-form">
                    <label htmlFor="imagenes">Adjuntar imágenes</label>
                    <input
                        type="file"
                        id='imagenes'
                        name='imagenes'
                        onChange={(e) => setProduct({ ...product, images: e.target.files })}
                        accept='.jpeg, .png, .jpg'
                        multiple
                        required
                    />
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
