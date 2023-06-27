"use client"
import { Reducer } from "../components/context/themecontext";
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useEffect, useRef, useState } from 'react';

 const metadata = {
    title: 'Calendario',
    description: 'calendario',
  }

export default function Calendario(){    

    const inputNomCal = useRef(null);
    const inputNomSchoolday = useRef(null);
    const { datasite, setDatasite } = Reducer();
    const [loadcal, setLoadcal] = useState(true);
    const [fillcall, setFillcall] = useState('');
    const [fillschoolday, setFillschoolday] = useState('');
    const [loadschoolday, setLoadschoolday] = useState(true);

    useEffect(() => {
        setLoadcal(false)
        loaddata()
    }, [loadcal]);

    useEffect(() => {
        setLoadschoolday(false)
        loaddataschoolday()
    }, [loadschoolday]);

    

    const insertSchedule = () =>{
        const inpNomCal = inputNomCal.current.value.trim()
        if(!inpNomCal){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }

       const validate = datasite.calendario.filter((ele) =>{
            return ele == inpNomCal
        })

        if(validate.length){
            Alertas('Información','Ya existe el calendario')
            return false
        }

       setDatasite((prevState) => ({...prevState,calendario:[
                ...prevState.calendario,
                inpNomCal,
        ]}))
        inputNomCal.current.value = ''
        setLoadcal(true)
    }

    const loaddata = () =>{

        setFillcall( datasite.calendario.map((ele,x) =>{
             return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
             <div className="ms-2 me-auto ">
                 <i className="bi bi-arrow-right-circle ms-3">{ele}</i>
             </div>
             <span><i class="bi bi-trash fs-2 text-danger"></i></span>
             <span><i class="bi bi-pencil-square fs-2 text-success"></i></span>
         </li>
        }))
    }

    const insertSchoolday = () =>{
        const inpNonSchoolday = inputNomSchoolday.current.value.trim()
        if(!inpNonSchoolday){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }
        const validate = datasite.jornada.filter((ele) =>{
            return ele == inpNonSchoolday
        })

        if(validate.length){
            Alertas('Información','Ya existe la jornada')
            return false
        }
        setDatasite((prevState) => ({...prevState,jornada:[
            ...prevState.jornada,
            inpNonSchoolday,
        ]}))
        inputNomSchoolday.current.value = ''
        setLoadschoolday(true)

    }

    const loaddataschoolday = () =>{

        setFillschoolday( datasite.jornada.map((ele,x) =>{
             return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto ">
                            <i className="bi bi-arrow-right-circle ms-3">{ele}</i>
                        </div>
                        <span><i class="bi bi-trash fs-2 text-danger"></i></span>
                        <span><i class="bi bi-pencil-square fs-2 text-success"></i></span>
                    </li>
        }))
    }

    return(
        <main>
            <Menu flag='calendario' />
            <div className="container-fluid mt-5"> 
                <div className="row ">
                    <div className="col-sm-12 col-md-6 mb-2 ">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar calendario</h3>
                                <div className="row align-items-center justify-content-center">
                                    <label htmlFor="inputNomCal" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre calendario</label>
                                    <div className="col-6">
                                        <input type="text" className="form-control border-primary" name='inputNomCal' id="inputNomCal"  ref={inputNomCal}/>
                                    </div>
                                </div>
                               <div className="text-center"> <button className='btn btn-primary my-3 ' name="btn_insert_sche" id="btn_insert_sche" onClick={insertSchedule}>Insertar</button></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 ">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Calendarios</h3>
                            {fillcall != '' && <ul className="list-group border-0">
                                {fillcall}
                            </ul>}
                        </div>
                    </div>
                    {/* contenido jornada */}
                    <div className="col-sm-12 col-md-6 mb-2 ">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar jornada</h3>
                                <div className="row align-items-center justify-content-center">
                                    <label htmlFor="inputNomSchoolday" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre jornada</label>
                                    <div className="col-6">
                                        <input type="text" className="form-control border-primary" name='inputNomSchoolday' id="inputNomSchoolday"  ref={inputNomSchoolday}/>
                                    </div>
                                </div>
                               <div className="text-center"> <button className='btn btn-primary my-3 ' name="btn_insert_jor" id="btn_insert_jor" onClick={insertSchoolday}>Insertar</button></div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2 ">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Jornadas</h3>
                            {fillschoolday != '' && <ul className="list-group border-0">
                                {fillschoolday}
                            </ul>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           