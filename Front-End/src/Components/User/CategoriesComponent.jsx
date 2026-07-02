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

    "Suite": 5,
    "Habitación Deluxe": 4,
    "Villa privada": 3,
    "Habitación Premium": 3,
  }


  const getCoverImage = (product) => {
    const index = coverImages[product.name] ?? 0;

    return product.imagesUrl?.[index] || null
  }

  const premiumCollectionData = getPremiumCollection()
  const classicCollectionData = getClassicCollection()

  const handleProductClick = (product) => {
    navigate(`/product/${product.type}/${product.id}`)
  };

  return (
    <div className='categories-container'>

      <p className='categories-main-title'> Situado en una isla privada bañada por aguas turquesas, nuestro resort redefine el lujo contemporáneo con un ambiente sereno, exclusivo y rodeado de naturaleza prístina. </p>

      {/*CATEGORIA 1*/}
      <div className='category-section'>
        <h2 className='category-title'>Premimum Collection</h2>
        <div className='category-grid'>
          {premiumCollectionData.map((room) => (
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


