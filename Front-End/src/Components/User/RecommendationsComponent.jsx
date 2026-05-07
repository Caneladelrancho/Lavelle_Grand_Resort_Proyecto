import { useNavigate } from "react-router-dom";
import '../../styles/User/recommendations.css'


export const RecommendationsComponent = ({ products }) => {

    const navigate = useNavigate()

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

    const getCoverImage = (product) => {
    const coverFileName = coverImages[product.name];
    
    if (coverFileName) {      
      const coverUrl = product.imagesUrl.find(url => url.includes(coverFileName));
      if (coverUrl) {
        return coverUrl;
      }
    }
    
    return product.imagesUrl[0];
  };

    const getRandomProducts = (productsArray) => {

        const shuffled = [...productsArray].sort(() => Math.random() - 0.5)
        return shuffled.slice(0, 10)
    }

    const randomProducts = getRandomProducts(products)

    const handleProductClick = (product) =>{
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
