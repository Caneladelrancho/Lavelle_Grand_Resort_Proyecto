import { useState } from "react"
import Swal from "sweetalert2"
import '../../styles/User/roomSearch.css'


export const RoomSearchComponent = () => {

    const [searchData, setSearchData] = useState({
        checkIn: '',
        checkOut: '',
        adults: 1,
        children: 0,
        roomType: 'any'
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setSearchData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSearch = (e) => {
        e.preventDefault();
    }

    /*if (!searchData.checkIn || !searchData.checkOut) {
        alert('Por favor selecciona las fechas de check-in y check-out')
        return
    }

    if (new Date(searchData.checkIn) >= new Date(searchData.checkOut)) {
        alert('La fecha de check-out debe ser posterior a la de check-in')
        return        
    }*/

    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0]
    }

    const getMinCheckOutDate = () => {
        if (!searchData.checkIn) return getTodayDate()
        const checkInDate = new Date(searchData.checkIn)
        checkInDate.setDate(checkInDate.getDate() + 1)
        return checkInDate.toISOString().split('T')[0]

    }


    return (
        <div className="room-search-container">
            <div className="title-form">
                <h2>Encuentra tu habitación perfecta</h2>
            </div>

            <div className="search-form">
                <div className="form-group date-field">
                    <label htmlFor="checkIn">Check-in</label>
                    <input
                        type="date"
                        id="checkIn"
                        name="checkIn"
                        value={searchData.checkIn}
                        onChange={handleInputChange}
                        min={getTodayDate()}
                        required
                    />
                </div>

                <div className="form-group date-field">
                    <label htmlFor="checkOut">Check-out</label>
                    <input
                        type="date"
                        id="checkOut"
                        name="checkOut"
                        value={searchData.checkOut}
                        onChange={handleInputChange}
                        min={getMinCheckOutDate()}
                        required
                    />
                </div>

                <div className="form-group number-field">
                    <label htmlFor="adults">Adultos</label>
                    <select
                        name="adults"
                        id="adults"
                        value={searchData.adults}
                        onChange={handleInputChange}
                    >
                        {[1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group number-field">
                    <label htmlFor="children">Niños</label>
                    <select
                        name="children"
                        id="children"
                        value={searchData.children}
                        onChange={handleInputChange}
                    >
                        {[0, 1, 2, 3, 4].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </select>
                </div>


                <div className="form-group room-type-field">
                    <label htmlFor="roomType">Tipo de habitación</label>
                    <select
                        name="roomType"
                        id="roomType"
                        value={searchData.roomType}
                        onChange={handleInputChange}
                    >
                        <option value="any">Cualquier tipo</option>
                        <option value="standard">Premium</option>
                        <option value="deluxe">Deluxe</option>
                        <option value="suite">Suite</option>
                        <option value="villa">Villa</option>
                    </select>
                </div>


                <button type="submit" className="search-button" onClick={handleSearch}>
                    Descubre estadias
                </button>
            </div>
        </div>
    )
}


