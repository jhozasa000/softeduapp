"use client"
import Menu from "../components/menu/Menu"
import { useRef , useState , useEffect} from 'react';
import { Reducer } from '../components/context/themecontext';


 const metadata = {
  title: 'Usuarios',
  description:'Usuarios'
}

export default function Usuarios(){
  const { datasite, setDatasite } = Reducer();
  const inpuser = useRef(null)
  const [loadusers, setLoadusers] = useState('');

  useEffect(() => {
    loadlistuser()
  },[]);

  const loadlistuser = () => {
    setLoadusers( datasite.usuario.map(({user},x) =>{
      return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                 <div className="ms-2 me-auto">
                     <i className="bi bi-arrow-right-circle ms-3">{user}</i>
                 </div>
                 <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                 <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
             </li>
 }))
  }

  return (
          <main>
            <Menu flag='usuarios' /> 
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar usuario</h3>
                            <div className="row align-items-center justify-content-center">
                                <label htmlFor="inputUser" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre usuario</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary my-3 " name='inputUser' id="inputUser"  ref={inpuser}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <label htmlFor="inputPass" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Clave usuario</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary my-3" name='inputPass' id="inputPass"  ref={inpuser}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                    <div className="card h-100">
                            <h3 className="my-2 text-center">Usuarios</h3>
                            <div className="card h-100">
                              {loadusers}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            </main>
          )
}