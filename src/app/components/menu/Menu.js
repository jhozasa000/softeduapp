'use client'
import Link from 'next/link';
import logomenu from '../../../../public/logo_dark.png'
import  Image  from 'next/image';
import { FirstletterUpper } from '../functions/helpers';
import { useEffect} from 'react';
import styles from './menu.module.css';
import { FiLogOut } from 'react-icons/fi';
import { useGlobalContext } from '../context/themecontext';


export default  function Menu(page) {
    const { dispatch } = useGlobalContext() ;
    
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    const menu = [
            { link: 'calendario', icon: false },
            { link: 'docentes', icon: false },
            { link: 'grados', icon: false},
            { link: 'materias', icon: false},
            { link: 'estudiantes', icon: false},
            { link: 'notas', icon: false},
            { link: 'reportes', icon: false},
            { link: 'usuarios', icon: false},
            { link: 'anuncios', icon: false},
    ]

    const loadmenu = menu.map(({link},i) => {
        const color = page.flag == link ? 'active':'text-white'
        return  <li key={i} className="nav-item flex-sm-fill text-sm-center mx-2"> 
                    <Link  className={`nav-link  ${color}`} prefetch={false} href={`/${link}`}>{FirstletterUpper(link)}</Link>
                </li>
    })

    const load = <>
    <header>
        <nav className="navbar">
            <div className="container-fluid">
                <Link className="navbar-brand ms-5" href={'/home'}>
                    <Image src={logomenu} width={200} alt='logo' className='img-fluid' priority />
                </Link>
                <form className="d-flex" role="search">
                {/* <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" name="btn_search" id='btn_search'/> */}

                <button
                    onClick={() => dispatch({ type: "LOGOUT"}) }
                    className="form-control"
                    type="button"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px 10px',
                        backgroundColor: '#f44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '16px',
                    }}
                    >
                        <FiLogOut style={{ marginRight: '8px' }} />
                    </button>
                </form>
            </div>
        </nav>
        <nav className={`navbar navbar-expand-lg navbar-light ${styles.navblue}`}>
            <div className="container-fluid">
                <button className="navbar-toggler border-light text-info  my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="nav nav-pills flex-column flex-sm-row">
                       {loadmenu}
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    </>

return  load

}