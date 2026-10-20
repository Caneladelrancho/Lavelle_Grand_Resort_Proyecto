import '../../styles/Admin/adminHeader.css'
import { useAuth } from '../Authentication/AuthContext'

export const AdminHeaderComponent = () => {

  const { user } = useAuth()

  return (
    <header className='admin-header'>
      <div className='admin-header-content'>
        <h2> Bienvenid@, {user?.name} {user?.lastName}</h2>
      </div>
    </header>
  )
}
