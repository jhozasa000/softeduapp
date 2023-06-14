import Image from 'next/image'
import Link from 'next/link';
import styles from './page.module.css'
import logo from '../../public/logo.png'

export default function Home() {

  console.log('process.env.NETLIFY_NEXT_PLUGIN_SKIP_VALUE  ', process.env.NETLIFY_NEXT_PLUGIN_SKIP_VALUE)

  return (
   <>
      <main className={styles.backgroundlogin}>
        <div className="container h-100">
          <div className="row h-100 justify-content-center align-items-center text-center">
            <div className="col-12 ">
              <Image src={logo} width={300} alt="logo" className="mb-4" priority />
                <div className="mb-3 row justify-content-center">
                  <label htmlFor="inputUser" className="col-2 col-form-label col-form-label-sm">Usuario</label>
                  <div className="col-3">
                    <input type="text" className="form-control form-control-sm" id="inputUser" />
                  </div>
                </div>
                <div className="mb-3 row justify-content-center">
                  <label htmlFor="inputPassword" className="col-2 col-form-label col-form-label-sm">Clave</label>
                  <div className="col-3">
                    <input type="password" className="form-control form-control-sm" id="inputPassword" />
                  </div>
                </div>
              <div className="col-12 mt-4">
                <div className="d-grid gap-2 col-2 mx-auto">
                    <Link href="/home" className='btn btn-primary'>Ingresar</Link>
                </div>
              </div>
            </div>
          </div>  
        </div>
      </main>   
   </>
  )
}