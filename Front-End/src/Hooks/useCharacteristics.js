import { useEffect } from "react"
import { useState } from "react"
import { getAllCharacteristics } from "../Api/Api"


export const useCharacteristics = () => {

    const [characteristics, setCharacteristics] = useState([])
    const [characteristicLoading, setCharacteristicLoading] = useState(true)

    useEffect(() => {
        const fetchCharacteristics = async () =>{
            try {
                const data = await getAllCharacteristics()
                setCharacteristics(data)                
            } catch (err) {
                console.error('Error al traer las características', err);                
            }finally{
                setCharacteristicLoading(false)
            }
        }
        fetchCharacteristics()
    }, [])
    
  return {characteristics, characteristicLoading}
}
