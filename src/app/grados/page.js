"use client"
import { Reducer } from "../components/context/themecontext";
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useEffect, useRef, useState } from 'react';

const metadata = {
    title: 'Docentes',
    description: 'Docentes',
  }

export default function Grados(){    

    const inputNomCourse = useRef(null);
    const inputcal = useRef(null);
    const inputjor = useRef(null);
    const { datasite, setDatasite } = Reducer();
    const [loadcourse, setLoadcourse] = useState(true);
    const [fillcor, setFillcor] = useState('');
    const [fillcal, setFillcal] = useState(true);
    const [fillday, setFillday] = useState(true);

    useEffect(() => {
        setLoadcourse(false)
        loaddata()
        setFillcal(datasite.calendario.map((ele,key) => { return <option key={key+1} value={ele}>{ele}</option>}))
        setFillday(datasite.jornada.map((ele,key) => { return <option key={key+1} value={ele}>{ele}</option>}))
    }, [loadcourse]);

    const insertCourse = () =>{
        const inpGr = inputNomCourse.current.value.trim()
        const inpCa = inputcal.current.value
        const inpJo = inputjor.current.value

        if(!inpGr|| !inpCa || !inpJo){
            Alertas('Información','Los campos no pueden estar vacíos')
            return false
        }
        const validate = datasite.grados.filter(({inpG,inpC, inpJ}) =>{
            return inpGr == inpG && inpCa == inpC &&  inpJo == inpJ
        })

        if(validate.length){
            Alertas('Información','Ya existe el grado')
            return false
        }
        const obj = new Object();
        obj['inpG'] = inpGr
        obj['inpC'] = inpCa
        obj['inpJ'] = inpJo


       setDatasite((prevState) => ({...prevState,grados:[
                ...prevState.grados,
                obj,
        ]}))
        inputNomCourse.current.value = ''
        inputcal.current.value = ''
        inputjor.current.value = ''
        setLoadcourse(true)
    }

    const loaddata = () =>{

        setFillcor( datasite.grados.map(({inpG,inpC,inpJ},x) =>{
             return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto">
                                <div className='text-primary fw-bold'>{inpG}</div>
                                    <i className="bi bi-arrow-right-circle ms-3">{inpC} - {inpJ}</i>
                            </div>
                        <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                        <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                    </li>
        }))
    }



    return(
        <main>
            <Menu flag='grados' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar grado</h3>
                            <div className="row align-items-center justify-content-center">
                                <label htmlFor="inputNomCourse" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre grado</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inputNomCourse' id="inputNomCourse"  ref={inputNomCourse}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <label htmlFor="inputNomCourse" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Calendario</label>
                                <div className="col-6">
                                    <select className="form-select border-primary" ref={inputcal}>
                                        <option key={0} value={''}>Seleccione calendario</option>
                                        {fillcal}
                                    </select>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <label htmlFor="inputNomCourse" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Jornada</label>
                                <div className="col-6">
                                    <select className="form-select border-primary" ref={inputjor}>
                                        <option key={0} value={''}>Seleccione jornada</option>
                                        {fillday}
                                    </select>
                                </div>
                            </div>

                            
                            <div className="text-center"> <button className='btn btn-primary my-3 ' onClick={insertCourse}>Insertar</button></div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                    <div className="card h-100">
                            <h3 className="my-2 text-center">Grados</h3>
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