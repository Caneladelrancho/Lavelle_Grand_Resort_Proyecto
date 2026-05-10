import { useNavigate } from "react-router-dom";
import '../../styles/User/recommendations.css'


export const RecommendationsComponent = ({ products }) => {

    const navigate = useNavigate()

    const coverImages = {
        //Rooms
        "Suite": 5,
        "Habitación Deluxe": 4,
        "Villa privada": 3,
        "Habitación Premium": 3,
        //Amenities
        "spa": 0,
        "Experiencias gastronómicas": 4,
        "BAR": 0,
        "Aventura y naturaleza": 4,
        "Gimnasio": 0,
        "Eventos y bodas": 2,
        "Actividades acuáticas": 1,
        "Piscinas": 4,
    }

    const getCoverImage = (product) => {

        const index = coverImages[product.name] ?? 0;

        return product.imagesUrl?.[index] || null;
    };

    const getRandomProducts = (productsArray) => {

        const shuffled = [...productsArray].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, 10)
    }

    const randomProducts = getRandomProducts(products)

    const handleProductClick = (product) => {
        navigate(`/product/${product.type}/${product.id}`)
    }


    return (
        <div className='recommendations-container'>
            <p className='recommendations-title'> Situado en una isla privada bañada por aguas turquesas, nuestro resort redefine el lujo contemporáneo con un ambiente sereno, exclusivo y rodeado de naturaleza prístina. </p>
            <div className='recommendations-grid'>
                {randomProducts.map((product) => (
                    <div
                        key={`${product.type}--${product.id}`}
                        className='product-card'
                        onClick={() => handleProductClick(product)}
                    >
                        <img
                            src={getCoverImage(product)}
                            alt={product.name}
                            className='product-image'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
