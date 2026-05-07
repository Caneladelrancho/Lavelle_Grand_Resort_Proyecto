import Swal from "sweetalert2";

export const UseSweetAlert =() =>{

    const showConfirm = async (title, text) =>{
        const result = await Swal.fire({
            title: title,
            text: text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#EB1E4E',
            cancelButtonColor: '#034363'

        })

        return result.isConfirmed
    }

    const showSuccess = (message) => {
        Swal.fire({
            title: '¡Listo!',
            text: message,
            icon: 'success',
            confirmButtonColor: '#034363'
        })
    }

    const showError = (message) => {
        Swal.fire({
            title: 'Error',
            text: message,
            icon: 'error',
            confirmButtonColor: '#034363'
        })
    }

    return {showConfirm, showSuccess, showError}
    
}