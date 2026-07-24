import { useEffect, useState } from "react"
import { getAllUsers, updateUser } from "../../Api/Api"
import { useSweetAlert } from "../../Hooks/sweetAlertHook"
import { useAuth } from "../Authentication/AuthContext"
import '../../styles/Admin/userList.css'


export const UserListComponent = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const { showConfirm, showSuccess, showError } = useSweetAlert()
    const { user: currentUser } = useAuth()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        setError('')
        try {
            const getUsers = await getAllUsers()
            setUsers(getUsers)

        } catch (err) {
            setError('Error al cargar los usuarios.')
        } finally {
            setLoading(false)
        }
    }

    
    const handleUpdateRole = async (id, role, name) => {

        const confirmed = await showConfirm(
            '¿Cambiar rol?',
            `¿Estás seguro que deseas cambiar el rol para "${name}"?`,
            'Sí, cambiar rol'
        )

        if (!confirmed) return

        try {
            const newRol = role === 'ADMIN' ? 'USER' : 'ADMIN'
            await updateUser(id, newRol)

            await fetchUsers()
            showSuccess(`El rol para el usuario ${name} ha sido actualizado exitosamente.`)

        } catch (err) {
            showError('Error al actualizar el rol. Intenta nuevamente')
        }
    }

    if (loading) return <div className="user-list-status">Cargando usuarios...</div>
    if (error) return <div className="user-list-error">{error}</div>

    return (
        <div className="user-list-container">
            <h2 className="usr-list-title">Lista de usuarios</h2>

            {users.length === 0 ? (
                <p className="user-table-text">No hay usuarios registrados.</p>
            ) : (
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Rol</th>
                            <th>Cambiar rol</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(updatedUser => {
                            return (
                                <tr key={`${updatedUser.id}`}>
                                    <td>{updatedUser.id}</td>
                                    <td>{updatedUser.name}</td>
                                    <td>{updatedUser.lastName}</td>
                                    <td>{updatedUser.email}</td>
                                    <td>{updatedUser.role}</td>
                                    <td>
                                        {updatedUser.id !== currentUser.id ? (
                                            <button className="chg-role-button" onClick={() => handleUpdateRole(updatedUser.id, updatedUser.role, updatedUser.name)}>
                                                Cambiar rol
                                            </button>
                                        ) : (
                                            null
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            )}
        </div>
    )
}
