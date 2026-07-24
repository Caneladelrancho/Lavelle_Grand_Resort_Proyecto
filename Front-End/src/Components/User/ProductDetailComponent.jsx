import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllAmenities, getAllRooms } from "../../Api/Api"
import '../../styles/User/productDetail.css'


export const ProductDetailComponent = () => {

    const { type, id } = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const coverImages = {
        //Rooms
        "Suite": "a3be20d8-39fb-40a1-9ab4-3b09376fe900_su_1.jpeg",
        "Habitación Deluxe": "e3a0a72d-db15-432b-856d-dc05299f7cb7_deluxe_2.jpeg",
        "Villa privada": "0dc37f67-dd5b-44a2-8c96-542e2ef99f02_villa_1.jpeg",
        "Habitación Premium": "17861b9f-e54f-48da-9911-479642c06ed5_pre_3.jpeg",
        //Amenities
        "spa": "9a0c8a70-07d5-403c-8097-41257dbff283_spa_6.JPG",
        "Experiencias gastronómicas": "4e139d08-fb8a-44ce-b94c-11efc192a0ca_Gastro_2.jpg",
        "BAR": "2a007163-62e2-427a-85b9-0d3b4459936e_Bar_5.jpeg",
        "Aventura y naturaleza": "25b1c78e-c0e0-4b27-bc4e-3b94bf69001d_an_1.jpg",
        "Gimnasio": "4dc77015-da56-465a-9766-f0308e8166f3_gym_1.jpeg",
        "Eventos y bodas": "07690e04-045a-419f-bf0c-4e4f36d99fa6_eb_4.JPG",
        "Actividades acuáticas": "f841b221-f789-4135-b70b-fc6fc1b6adea_acu_5.jpg",
        "Piscinas": "4ec64a22-d201-4c0c-be4e-9ee9189cb76c_p1_4.jpg",
    }

    useEffect(() => {
        const fetchProduct = async () => {

            try {
                setLoading(true)

                let products

                if (type === 'ROOM') {
                    products = await getAllRooms()
                } else if (type === 'AMENITY') {
                    products = await getAllAmenities()
                }

                const foundProduct = products.find(p => p.id === parseInt(id))

                if (foundProduct) {
                    setProduct(foundProduct)
                    //setSelectedImage(0)
                }

                setLoading(false)

            } catch (error) {
                console.log('Error fetching product:', error);
                setLoading(false)
            }
        }
        fetchProduct()
    }, [type, id])

    const handleBack = () => {
        navigate('/')
    }


    if (loading) {
        return null
    }

    if (!product) {
        return <div>Producto no encontrado</div>
    }

    const coverImageName = coverImages[product.name]
    const galleryImages = product.imagesUrl.filter(url => !url.includes(coverImageName))



    return (
        <div className="product-container">
            {/*HEADER*/}

            <header className="product-header">
                <h1>Lavelle Grand Resort</h1>
            </header>

            {/*BODY*/}
            <div className="product-body">

                <div className="product-title">
                    <h1 className="title">{product.name}</h1>
                    <button className="back-button" onClick={handleBack}>
                        <img src='/img/return-arrow.png' alt="volver" />
                    </button>
                </div>

                {/*GALERIA*/}
                <div className="gallery-section">

                    {/*IMG PRINCIPAL*/}
                    <div className="main-image-container">
                        <img
                            src={galleryImages[0]}
                            alt={product.name}
                            className="main-image"
                        />
                    </div>

                    {/*GRID DE 4 IMG*/}
                    <div className="thumbnails-grid">
                        {galleryImages.slice(1, 5).map((image, index) => (
                            <div key={index} className="thumbnail">
                                <img src={image} alt={product.name} />
                            </div>
                        ))}
                    </div>
                    <button className="view-more-btn" onClick={() => setIsModalOpen(true)}>
                        Ver más
                    </button>
                </div>
                {/*MODAL GALERIA RESPONSIVE*/}
                {isModalOpen && (
                    <div className="gallery-modal" onClick={() => setIsModalOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                            <button className="close-button" onClick={() => setIsModalOpen(false)}>
                                <img src="/img/icon_close.png" alt="cerrar" />
                            </button>
                            <h2 className="modal-title">{product.name}</h2>
                            <div className="modal-images">
                                {galleryImages.map((image, index) => (
                                    <img key={index} src={image} alt={`${product.name} ${index +1}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                {/*DESCRIPCIÓN*/}
                <div className="description-section">
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    )
}
