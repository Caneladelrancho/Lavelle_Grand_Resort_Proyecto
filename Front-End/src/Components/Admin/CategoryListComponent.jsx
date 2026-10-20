import { useState, useEffect } from 'react'
import '../../styles/Admin/categoryList.css'
import { useSweetAlert } from '../../Hooks/sweetAlertHook'
import { deleteCategory, getAllCategories } from '../../Api/Api'

export const CategoryListComponent = () => {

    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [fetchError, setFetchError] = useState('')

    const { showConfirm, showSuccess, showError } = useSweetAlert()

    useEffect(() => {  
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        setLoading(true)
        setFetchError('')
        try {
            const getCategories = await getAllCategories()
            setCategories(getCategories)
        } catch (err) {
            setFetchError('Error al cargar las categorías.')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id, title) => {
        const confirmed = await showConfirm(
            '¿Eliminar categoría?',
            `¿Estás seguro de que deseas eliminar "${title}"? Esta acción no se puede revertir.`
        )

        if (!confirmed) return

        try {
            await deleteCategory(id)
            await fetchCategories()
            showSuccess('La categoría fue eliminada exitosamente.')
        } catch (err) {
            showError('Error al eliminar la categoría. Intenta nuevamente.')
        }
    }

    if (loading) return <div className="cat-list-status">Cargando categorías...</div>
    if (fetchError) return <div className="cat-list-status-error">{fetchError}</div>

    return (
        <div className='cat-list-container'>
            <h2>Lista de categorías</h2>

            {categories.length === 0 ? (
                <p className='cat-list-empty'>No hay categorías registradas.</p>
            ) : (
                <table className='cat-table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Tipo de categoría</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.title}</td>
                                <td>{category.categoryType}</td>
                                <td>
                                    <button
                                        className='cat-delete-btn'
                                        onClick={() => handleDelete(category.id, category.title)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}
