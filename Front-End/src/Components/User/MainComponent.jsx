import { RoomSearchComponent } from "./RoomSearchComponent";
import { RecommendationsComponent } from "./RecommendationsComponent";
import { useEffect, useState } from "react";
import { getAllRooms, getAllAmenities } from '../../Api/Api'
import '../../styles/User/main.css'
import { CategoriesComponent } from "./CategoriesComponent";

export const MainComponent = () => {

  const [allProducts, setAllProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)

        //Hacer llamada al backend
        const roomsData = await getAllRooms()
        const amenitiesData = await getAllAmenities()

        //Combinar arrays con el spread operator
        const combined = [...roomsData, ...amenitiesData]

        setAllProducts(combined)
        setLoading(false)
      } catch (err) {
        setError('Error al cargar los productos')
        setLoading(false)
        console.log(err);

      }
    }

    fetchProducts()//ejecutar funcion
  }, [])

  /* if (loading || error) {
    return null; // O puedes poner un loader global aquí si quieres
  }*/



  return (
    <main className="main-container">

      <section className="main-image">
        <div className="background-image"></div>
      </section>

      <section className="room-search-compt">
        <RoomSearchComponent />
      </section>

      <section>
        <CategoriesComponent products={allProducts}/>
      </section>

      <section>
        <RecommendationsComponent products={allProducts} />
      </section>

    </main>
  )


}
