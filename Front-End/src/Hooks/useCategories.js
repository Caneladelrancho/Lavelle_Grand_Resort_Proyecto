import { useEffect, useState } from "react"
import { getAllCategories } from "../Api/Api"


export const useCategories = () => {

    const [categories, setCategories] = useState([])
    const [categoryLoading, setCategoryLoading] = useState(true)

    useEffect(() => {
        const fetchCategories = async () => {
            try{
                const data = await getAllCategories()
                setCategories(data)
            }catch(err){
                console.error('Error al traer categorías:', err);                
            }finally{
                setCategoryLoading(false)
            }
        }
        fetchCategories()
    }, [])

  return {categories, categoryLoading}
}
