import { useNavigate } from 'react-router-dom'
import '../../styles/User/categories.css'

export const CategoriesComponent = ({ products }) => {

  const navigate = useNavigate();

  if (!products || products.length === 0) {
    return null
  }

  const rooms = products.filter(product => product.type === 'ROOM')
    

  const premiumCollection = ["Villa privada", "Suite"]
  const classicCollection = ["Habitación Deluxe", "Habitación Premium"]

  const getPremiumCollection = () => {
    return rooms.filter(room => premiumCollection.includes(room.name))
  }

  const getClassicCollection = () => {
    return rooms.filter(room => classicCollection.includes(room.name))
  }

  const coverImages = {

    "Suite": "a3be20d8-39fb-40a1-9ab4-3b09376fe900_su_1.jpeg",
    "Habitación Deluxe": "e3a0a72d-db15-432b-856d-dc05299f7cb7_deluxe_2.jpeg",
    "Villa privada": "0dc37f67-dd5b-44a2-8c96-542e2ef99f02_villa_1.jpeg",
    "Habitación Premium": "17861b9f-e54f-48da-9911-479642c06ed5_pre_3.jpeg",
  }


  const getCoverImage = (product) => {
    const coverFileName = coverImages[product.name];

    if (coverFileName) {
      const coverUrl = product.imagesUrl.find(url => url.includes(coverFileName));
      if (coverUrl) {
        return coverUrl;
      }
    }

    return product.imagesUrl[0]
  }

  const premiumCollectionData = getPremiumCollection()
  const classicCollectionData = getClassicCollection()

  const handleProductClick = (product) => {
    navigate(`/product/${product.type}/${product.id}`)};

  return (
    <div className='categories-container'>      

      {/*CATEGORIA 1*/}
      <div className='category-section'>
        <h2 className='category-title'>Premimum Collection</h2>
        <div className='category-grid'>
          {premiumCollectionData.map((room) => (
            <div
              key={`${room.type}${room.id}`}
              className='category-card'
              onClick={()=> handleProductClick(room)}
            >
              <img
                src={getCoverImage(room)}
                alt={room.name}
                className='category-image'
              />
              <div className='category-info'>
                <h3 className='category-name'>{room.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*CATEGORIA 2*/}
      <div className='category-section'>
        <h2 className='category-title'>Classic Collection</h2>
        <div className='category-grid'>
          {classicCollectionData.map((room) => (
            <div
              key={`${room.type}${room.id}`}
              className='category-card'
              onClick={() => handleProductClick(room)}
            >
              <img
                src={getCoverImage(room)}
                alt={room.name}
                className='category-image'
              />
              <div className='category-info'>
                <h3 className='category-name'>{room.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}


