import { useNavigate } from "react-router-dom";
import '../../styles/User/recommendations.css'


export const RecommendationsComponent = ({ products }) => {

    const navigate = useNavigate()

    const coverImages = {
        
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

        const amenitiesOnly = productsArray.filter(product => product.type === 'AMENITY')
        const shuffled = [...amenitiesOnly].sort(()=> Math.random() - 0.5)        
        return shuffled.slice(0, 10)
    }

    const randomProducts = getRandomProducts(products)

    const handleProductClick = (product) => {
        navigate(`/product/${product.type}/${product.id}`)
    }


    return (
        <div className='recommendations-container'>

            <p className='recommendations-title'> En Lavelle Grand Resort, el lujo se encuentra en cada detalle. Todas nuestras amenidades están incluidas para nuestros huéspedes, mientras que algunas experiencias exclusivas pueden programarse durante tu estancia para disfrutar de un servicio más personalizado. </p>          
            

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
