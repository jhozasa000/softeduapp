"use client"
import {  Reducer } from './components/context/themecontext';
import Image from 'next/image'
import styles from './page.module.css'
import logo from '../../public/logo.png'
import { useRef } from 'react';
import { useRouter} from 'next/navigation' 
import { Alertas } from './components/functions/helpers';

export default function Login() {

  const inputuser = useRef(null);
  const inputpass = useRef(null);
  const router = useRouter()
  const { datasite, setDatasite } = Reducer();
  const data = {
    user:'admin',
    pass:'123'
  }

  const login = () => {
    const inpUser = inputuser.current.value
    const inpPass = inputpass.current.value

    if(!inpUser || !inpPass){
      Alertas( 'Información' ,'Digilenciar todos los campos')
      return false
    }

    if(data.user === inpUser && data.pass === inpPass){
      setDatasite({
        ...datasite,
        user: inpUser
        })
      router.push('/home')
    }else{
      Alertas( 'Información' ,'Validar los campos ingresados')
      return false
    }
  }

  return (
   <>
      <main className={`${styles.backgroundlogin} d-flex align-items-center h-100  text-center `}>
      <title>{'Login SofteduApp'}</title>

        <div className="col-12">
            <Image src={logo}  alt="logo" className="img-fluid mb-5" priority width={300}  />
                <div className="mb-3 row align-items-center justify-content-center">
                    <label htmlFor="inputUser"  className="col-3 col-form-label col-form-label-sm fs-4 fw-bold" >Usuario</label>
                    <div className="col-5 col-md-3 col-lg-3">
                      <input type="text" className="form-control " name='inputUser' id="inputUser" ref={inputuser} />
                    </div>
                  </div>
                  <div className="row align-items-center justify-content-center">
                    <label htmlFor="inputPassword" className="col-3 col-form-label col-form-label-sm fs-4 fw-bold">Clave</label>
                    <div className="col-5 col-md-3 col-lg-3">
                      <input type="password" className="form-control " name='inputPassword' id="inputPassword"  ref={inputpass}/>
                    </div>
                  </div>
            <button className='btn btn-primary mt-5' onClick={() => login()}>Ingresar</button>
        </div>
      </main>

   </>
  )
}