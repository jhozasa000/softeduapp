import Swal from 'sweetalert2';

const FirstletterUpper = (value) => {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
}

const Alertas = (title,msg, timer) => {
    Swal.fire({
          title: `<strong>${title}</strong>`,
          html:msg,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText:'Cerrar',
          confirmButtonColor: '#3085d6',
          timer: timer ? timer : 2000,
        })
  }
export {FirstletterUpper,Alertas};