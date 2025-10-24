import '../../styles/Admin/adminHeader.css'

export const AdminHeaderComponent = ({adminName}) => {  
                
  return (
    <header className='admin-header'>
      <div className='admin-header-content'>
        <h2> Bienvenido, {adminName}</h2>        
      </div>
    </header>
  )
}
