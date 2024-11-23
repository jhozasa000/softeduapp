import Swal from 'sweetalert2';
import CryptoJS from "crypto-js";

const FirstletterUpper = (value) => {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
}

const Alertas = (title,msg,time) => {
    Swal.fire({
          title: `<strong>${title}</strong>`,
          html:msg,
          showCloseButton: true,
          showCancelButton: false,
          focusConfirm: false,
          confirmButtonText:'Cerrar',
          confirmButtonColor: '#3085d6',
          timer: time??2000,
          timerProgressBar: true,
        })
  }

const encryptPasskey = (value) =>{
  const encryptedValue = CryptoJS.AES.encrypt(value, process.env.REACT_APP_KEY_SECRET).toString();
  return encryptedValue
}

const decryptPasskey = (value) =>{
  const bytes = CryptoJS.AES.decrypt(value, process.env.REACT_APP_KEY_SECRET);
  const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedValue
}

export {FirstletterUpper,Alertas, encryptPasskey, decryptPasskey};