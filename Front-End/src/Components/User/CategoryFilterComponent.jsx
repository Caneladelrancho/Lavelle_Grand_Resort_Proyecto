import { useCategories } from '../../Hooks/useCategories'
import { useNavigate } from 'react-router-dom'
import { ProductCard } from '../../utils/ProductCard'
import { useState } from 'react'
import '../../styles/User/categoryFilter.css'

const filterImages = {
    "ROOM-2": 1,
    "ROOM-4": 4,
    "ROOM-21": 1,
    "ROOM-22": 4,
    "AMENITY-1": 2,
    "AMENITY-3": 4,
    "AMENITY-4": 3,
    "AMENITY-5": 5,
    "AMENITY-6": 5,
    "AMENITY-7": 5,
    "AMENITY-8": 5,
    "AMENITY-12": 5,
}

export const CategoryFilterComponent = ({ products }) => {

    const [selectedCategories, setSelectedCategories] = useState([])

    const navigate = useNavigate()
    const { categories, categoryLoading } = useCategories()

    //Traer solo los ids de las categorias seleccionadas
    const selectedIds = selectedCategories.map(category => category.id)

    const filteredProducts = products.filter(product => {
        return selectedIds.includes(product.categoryResponseDto?.id)
    })

    //"Encender" o "apagar" una categoria dentro de selected categories
    const toggleCategory = (clickedCategory) => {

        // Si la categoria ya estaba seleccionada
        if (selectedCategories.includes(clickedCategory)) {
            //nuevo array actual sin la categoria que ya estaba seleccionada
            setSelectedCategories(selectedCategories.filter(category => category !== clickedCategory))
        } else {
            //Si la categoria no estaba seleccionada, se crea el nuevo array incluyendo esa categoria
            setSelectedCategories([...selectedCategories, clickedCategory])
        }
    }

    const getFilterImage = (product) => {
        const index = filterImages[`${product.type}-${product.id}`] ?? 0
        return product.imagesUrl?.[index] || null
    }

    const clearFilters = () => {
        setSelectedCategories([])
    }


    const handleProductClick = (product) => {
        navigate(`/product/${product.type}/${product.id}`)
    }

    return (
        <div className='ctg-filter-container'>

            <div className='ctg-filter-header'>
                <h2>Descubre todo lo que Lavelle tiene para ti</h2>
                <p>Explora nuestras habitaciones, experiencias y servicios y encuentra aquello que hará especial tu estancia.</p>
            </div>

            <div className='ctg-filter-list'>
                {categoryLoading ? (
                    <p>Cargando categorías ...</p>
                ) : (
                    categories.map(category => (

                        <button
                            className={`ctg-filter-btn ${selectedCategories.includes(category) ? 'ctg-filter-btn-active' : ''}`}
                            key={category.id}
                            onClick={() => toggleCategory(category)}
                        >
                            {category.title}
                        </button>
                    ))
                )}
            </div>

            {selectedCategories.length >= 1 && (                
                <p className='ctg-filter-msg'>Mostrando {filteredProducts.length} de {products.length} productos</p>                
            )}    

            <div className='ctg-results-grid'>
                {filteredProducts.map(product => (
                    <ProductCard
                        key={`${product.type}--${product.id}`}
                        productName={product.name}
                        productImage={getFilterImage(product)}
                        onProductClick={() => handleProductClick(product)}
                    />
                ))}
            </div>

            {selectedCategories.length >= 1 && (
                <div className='ctg-filter-btn-container'>
                    <button className='ctg-clear-btn' onClick={clearFilters}>
                        Limpiar filtros
                    </button>
                </div>
            )}
        </div>
    )
}
