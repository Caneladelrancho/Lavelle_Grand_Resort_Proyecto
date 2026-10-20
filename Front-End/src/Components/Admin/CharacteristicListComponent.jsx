import { useState } from 'react'
import '../../styles/Admin/characteristicList.css'
import { useSweetAlert } from '../../Hooks/sweetAlertHook'
import { useEffect } from 'react'
import { deleteCharacteristics, getAllCharacteristics, updateCharacteristic } from '../../Api/Api'
import { iconOptions } from '../../utils/iconOptions'

export const CharacteristicListComponent = () => {

    const [characteristics, setCharacteristics] = useState([])
    const [editingCharacteristic, setEditingCharacteristic] = useState(null)
    const [loading, setLoading] = useState(true)
    const [errors, setErrors] = useState({}) //errores de validacion de formularios ->objeto
    const [fetchError, setFetchError] = useState('') //error de cargar lista ->string
    const [updateLoading, setUpdateLoading] = useState(false)


    const { showConfirm, showSuccess, showError } = useSweetAlert()

    useEffect(() => {
        fetchCharacteristics()
    }, [])

    const fetchCharacteristics = async () => {
        setLoading(true)
        setFetchError('')
        try {
            const getCharacteristics = await getAllCharacteristics()
            setCharacteristics(getCharacteristics)
        } catch (err) {
            setFetchError('Error al cargar las características.')
        } finally {
            setLoading(false)
        }
    }


    const handleDelete = async (id, name) => {

        const confirmed = await showConfirm(
            '¿Eliminar característica?',
            `¿Estás seguro de que deseas eliminar "${name}"? Esta acción no se puede revertir.`
        )

        if (!confirmed) return

        try {
            await deleteCharacteristics(id)

            await fetchCharacteristics()
            showSuccess('La característica fue eliminada existosamente.')

        } catch (err) {
            showError('Error al eliminar la característica. Intenta nuevamente')

        }

    }

    //Cambio de estado, abrir el modal para que el admin decida que actualizar
    const handleEditClick = (characteristic) => {
        setEditingCharacteristic(characteristic)
    }

    const handleCloseModal = () => {
        setEditingCharacteristic(null)
    }

    const validate = () => {
        const newErrors = {}

        if (!editingCharacteristic.name.trim()) {
            newErrors.name = 'El nombre de la caracteristica es obligatorio.'
        } else if (editingCharacteristic.name.trim().length < 3) {
            newErrors.name = 'El nombre de la caracteristica debe tener al menos 3 caracteres.'
        }

        if (!editingCharacteristic.icon) {
            newErrors.icon = 'El icono es obligatorio. Por favor selecciona un icono.'
        }

        return newErrors
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault()

        const validationErrors = validate()

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setUpdateLoading(true)

        try {

            await updateCharacteristic(editingCharacteristic.id, editingCharacteristic)
            showSuccess('Característica actualizada exitosamente')
            handleCloseModal()
            await fetchCharacteristics()

        } catch (err) {
            showError('Error al actualizar la característica. Intenta nuevamente')
        } finally {
            setUpdateLoading(false)
        }
    }

    if (loading) return <div className="char-list-status">Cargando características...</div>
    if (fetchError) return <div className="char-list-status-error">{fetchError}</div>


    return (
        <div className='char-list-container'>
            <h2>Lista de características</h2>

            {characteristics.length === 0 ? (
                <p className='char-list'>No hay características registradas.</p>
            ) : (
                <table className='char-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Ícono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {characteristics.map(characteristic => {
                            const iconOption = iconOptions.find((opt) => opt.iconKey === characteristic.icon)

                            return (
                                <tr key={characteristic.id}>
                                    <td>{characteristic.id}</td>
                                    <td>{characteristic.name}</td>
                                    <td>{iconOption && <iconOption.Icon size={25} />}
                                    </td>
                                    <td>
                                        <button className='char-delete-btn' onClick={() => handleDelete(characteristic.id, characteristic.name)}>
                                            Eliminar
                                        </button>

                                        <button className='edit-char-btn' onClick={() => handleEditClick(characteristic)}>
                                            Editar
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}

            {editingCharacteristic && (
                <div className='modal-char-overlay' onClick={handleCloseModal}>
                    <form onSubmit={handleUpdateSubmit} className='char-modal-content' onClick={(e) => e.stopPropagation()}>
                        <h2 className='char-modal-title'>Editar característica</h2>

                        <div className='char-overlay-container'>

                            <div className='char-overlay-form'>
                                <label htmlFor="edit-name">Nombre</label>
                                <input
                                    type="text"
                                    name='edit-name'
                                    id='edit-name'
                                    value={editingCharacteristic.name}
                                    onChange={(e) => {
                                        setEditingCharacteristic({ ...editingCharacteristic, name: e.target.value })
                                        if (errors.name) setErrors({ ...errors, name: null })
                                    }}
                                />
                                {errors.name && <span className='error-message'>{errors.name}</span>}
                            </div>

                            <div className='char-overlay-form'>
                                <label htmlFor="icon">Ícono</label>
                                <select
                                    id="icon"
                                    value={editingCharacteristic.icon}
                                    onChange={(e) => {
                                        setEditingCharacteristic({ ...editingCharacteristic, icon: e.target.value })
                                        if (errors.icon) setErrors({ ...errors, icon: null })
                                    }}
                                >
                                    <option value="" disabled>Selecciona un ícono</option>
                                    {iconOptions.map((opt) => (
                                        <option key={opt.iconKey} value={opt.iconKey}>
                                            {opt.iconKey}
                                        </option>
                                    ))}
                                </select>
                                {errors.icon && <span className='error-message'>{errors.icon}</span>}
                            </div>

                            <button className='modal-upt-btn' type='submit' disabled={updateLoading}>{updateLoading ? 'Guardando ...' : 'Actualizar característica'}</button>
                            <button className='modal-cancel-btn' type='button' onClick={handleCloseModal}>Cancelar</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}
