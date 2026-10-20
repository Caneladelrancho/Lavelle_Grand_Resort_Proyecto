import '../styles/User/productCard.css'

export const ProductCard = ({ productImage, productName, onProductClick }) => {
  return (
    <div onClick={onProductClick}>
      <div className="product-card" >
        <img src={productImage} alt={productName} className="product-image" />
      </div>
      <h3 className='product-name'>{productName}</h3>
    </div>
  )
}
