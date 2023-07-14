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
    const inpCl = useRef(null)
    const inpGra = useRef(null)
    const inpTeac = useRef(null)
    const { datasite, setDatasite } = Reducer();
    const [loadsubject, setLoadsubject] = useState(true);
    const [fillcor, setFillcor] = useState('');
    const [fillcl, setFillcl] = useState('');
    const [fillpro, setFillpro] = useState('');
    const [filltea, setFilltea] = useState('');
    const [fillrela, setFillrela] = useState('');
    const [loadrela, setLoadrela] = useState(true);

    useEffect(() => {
        setLoadsubject(false)
        loaddata()
    }, [loadsubject]);

    useEffect(() => {
        setLoadrela(false)
        loadrel()
    }, [loadrela]);

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
        filldatarelationship()
    }

    const filldatarelationship = () => {
        setFillcl( datasite.materias.map((ele,x) =>{
            return <option key={x+1} value={ele}>{ele}</option>
        }))
       setFillpro( datasite.grados.map(({inpG,inpC,inpJ},x) =>{
        return <option key={x+1} value={inpG +' - '+ inpC  +' - '+ inpJ}>{inpG +' - '+ inpC  +' - '+ inpJ}</option>
        }))
        setFilltea( datasite.docentes.map(({inp,inpPro},x) =>{
            return <option key={x+1} value={inp +' - '+ inpPro}>{inp +' - '+ inpPro}</option>
        }))
    }

    const insertRelationship = () =>{
        const inpmD = inpCl.current.value
        const inpgD = inpGra.current.value
        const inpdD = inpTeac.current.value

        if(!inpmD || !inpgD || !inpdD){
            Alertas('Información','Los campos no pueden estar vacíos')
            return false
        }

        const validate = datasite.materiasrelaion.filter(({inpm,inpg,inpd}) =>{
            return inpm == inpmD && inpg == inpgD && inpd == inpdD
        })

        if(validate.length){
            Alertas('Información','Ya existe la relación')
            return false
        }

        const obj = new Object()
        obj['inpm'] = inpmD
        obj['inpg'] = inpgD
        obj['inpd'] = inpdD

        setDatasite((prevState) => ({...prevState,materiasrelaion:[
            ...prevState.materiasrelaion,
            obj,
        ]}))
        setLoadrela(true)
    }

    const loadrel = () =>{
        setFillrela(datasite.materiasrelaion.map(({inpm,inpg,inpd},x) => {
            return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto">
                                <div className='text-primary fw-bold'>{inpg} - {inpd}</div>
                                    <i className="bi bi-arrow-right-circle ms-3">{inpm}</i>
                            </div>
                        <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                        <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                    </li>
        })
    )}



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

                    <div className="col-sm-12 col-md-12 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Relación materia - grado - docente</h3>
                            <div className="row align-items-center justify-content-center my-2 card-body">
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-floating">
                                        <select className="form-select" id="inpCl" ref={inpCl}>
                                            <option key={0} value={''}>Selecciona materia</option>
                                            {fillcl}
                                        </select>
                                        <label htmlFor="inpCl">Materia</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-floating">
                                        <select className="form-select" id="inpGra" ref={inpGra}>
                                            <option key={0} value={''}>Selecciona grado</option>
                                            {fillpro}
                                        </select>
                                        <label htmlFor="inpGra">Grado</label>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-4">
                                    <div className="form-floating">
                                        <select className="form-select" id="inpTeac" ref={inpTeac}>
                                            <option key={0} value={''}>Selecciona docente</option>
                                            {filltea}
                                        </select>
                                        <label htmlFor="inpTeac">Docente</label>
                                    </div>
                                </div>
                            <div className="text-center"> <button className='btn btn-primary my-3 ' onClick={insertRelationship}>Insertar</button></div>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-12 mb-2" >
                        <div className="card h-100">
                            {fillrela}
                        </div>
                    </div>
                  
                </div>
            </div>
        </main>
    )

}           