"use client"
import { Reducer } from "../components/context/themecontext";
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useEffect, useRef, useState } from 'react';

const metadata = {
    title: 'Materias',
    description: 'Materias',
  }

export default function Materias(){    

    const inputNomCourse = useRef(null);
    const { datasite, setDatasite } = Reducer();
    const [loadsubject, setLoadsubject] = useState(true);
    const [fillcor, setFillcor] = useState('');

    useEffect(() => {
        setLoadsubject(false)
        loaddata()
    }, [loadsubject]);

    const insertCourse = () =>{
        const inpNomPro = inputNomCourse.current.value.trim()
        if(!inpNomPro){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }
        const validate = datasite.materias.filter((ele) =>{
            return ele == inpNomPro
        })

        if(validate.length){
            Alertas('Información','Ya existe la materia')
            return false
        }

       setDatasite((prevState) => ({...prevState,materias:[
                ...prevState.materias,
                inpNomPro,
        ]}))
        inputNomCourse.current.value = ''
        setLoadsubject(true)
    }

    const loaddata = () =>{

        setFillcor( datasite.materias.map((ele,x) =>{
             return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto">
                            <i className="bi bi-arrow-right-circle ms-3">{ele}</i>
                        </div>
                        <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                        <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                    </li>
        }))
    }



    return(
        <main>
            <Menu flag='materias' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar materia</h3>
                            <div className="row align-items-center justify-content-center">
                                <label htmlFor="inputNomCourse" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre materia</label>
                                <div className="col-6">
                                    <input type="text" className="form-control " name='inputNomCourse' id="inputNomCourse"  ref={inputNomCourse}/>
                                </div>
                            </div>
                            <div className="text-center"> <button className='btn btn-primary my-3 ' onClick={insertCourse}>Insertar</button></div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                    <div className="card h-100">
                            <h3 className="my-2 text-center">Materias</h3>
                            {fillcor != '' && <ul className="list-group border-0">
                                {fillcor}
                            </ul>}
                        </div>
                    </div>
                  
                </div>
            </div>
        </main>
    )

}           