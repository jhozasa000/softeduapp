"use client";
import Image from 'next/image';
import styles from './page.module.css';
import logo from '../../public/logo.png';
import { useRef, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { Alertas, decryptPasskey, encryptPasskey } from './components/functions/helpers';
import { Postdata } from './components/functions/Postdata';
import { useGlobalContext  } from './components/context/themecontext';

export default function Login() {
  const inputuser = useRef(null);
  const inputpass = useRef(null);
  const router = useRouter();
  const { dispatch } = useGlobalContext() ; // Acceder a dispatch del contexto

  const login = () => {
    const inpUser = inputuser.current.value;
    const inpPass = inputpass.current.value;

    if (!inpUser || !inpPass) {
      Alertas('Información', 'Diligenciar todos los campos');
      return false;
    }

    const datos = {
      user: inpUser,
      // pass: inpPass,
      state: 1
    };

    Postdata('login', datos).then((ele) => {
      if (!ele.data.error) {
        if(decryptPasskey(ele.data.pass) === inpPass){
         // Despachar la acción LOGIN para actualizar el contexto
          dispatch({ type: "LOGIN", payload: ele.data });
          // Redirigir al usuario
          router.push('/home');
        }else{
          Alertas('Información', "Validar la contraseña");
          return false;
        }
      } else {
        Alertas('Información', ele.data.error);
        return false;
      }
    });
  };

  return (
    <>
      <main className={`${styles.backgroundlogin} d-flex align-items-center h-100 text-center`}>
        <title>{'Login SofteduApp'}</title>

        <div className="col-12">
          <Image src={logo} alt="logo" className="img-fluid mb-5" priority width={300} />
          <div className="mb-3 row align-items-center justify-content-center">
            <label htmlFor="inputUser" className="col-3 col-form-label col-form-label-sm fs-4 fw-bold text-white">Usuario</label>
            <div className="col-5 col-md-3 col-lg-3">
              <input type="text" className="form-control" name="inputUser" id="inputUser" ref={inputuser} />
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <label htmlFor="inputPassword" className="col-3 col-form-label col-form-label-sm fs-4 fw-bold text-white">Clave</label>
            <div className="col-5 col-md-3 col-lg-3">
              <input type="password" className="form-control" name="inputPassword" id="inputPassword" ref={inputpass} />
            </div>
          </div>

          <button className="btn btn-primary mt-5" onClick={login}>Ingresar</button>
          <p></p>
          <span className="badge bg-light text-dark">Usuario: admin - Clave: 123</span>
        </div>
      </main>
    </>
  );
}
