"use client"
import { Reducer } from "../components/context/themecontext";
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { use, useEffect, useReducer, useRef, useState } from 'react';

const metadata = {
    title: 'Docentes',
    description: 'Docentes',
  }

export default function Docentes(){    

    const inputNomProfesion = useRef(null);
    const { datasite, setDatasite } = Reducer();
    const [loadpro, setLoadpro] = useState(true);
    const [fillpro, setFillpro] = useState('');

    const inp = useRef(null);
    const inpPro = useRef(null);
    const inpTel = useRef(null);
    const inpDir = useRef(null);
    const inpFile = useRef(null);
    const inpcedula = useRef(null)
    const [fillcarr, setfillcarr] = useState('');
    const [fillteacher, setFillteacher] = useState('');
    const [loadteacher, setLoadteacher] = useState(true);

    useEffect(() => {
        setLoadpro(false)
        loaddata()
        fillcareers()
    }, [loadpro]);

    useEffect(() => {
        setLoadteacher(false)
        loaddataTeacher()
    }, [loadteacher]);

    const insertBachelor = () =>{
        const inpNomPro = inputNomProfesion.current.value.trim()
        if(!inpNomPro){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }
        const validate = datasite.profesion.filter((ele) =>{
            return ele == inpNomPro
        })

        if(validate.length){
            Alertas('Información','Ya existe la profesión')
            return false
        }

       setDatasite((prevState) => ({...prevState,profesion:[
                ...prevState.profesion,
                inpNomPro,
        ]}))
        inputNomProfesion.current.value = ''
        setLoadpro(true)
    }

    const loaddata = () =>{

        setFillpro( datasite.profesion.map((ele,x) =>{
             return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto ">
                            <i className="bi bi-arrow-right-circle ms-3">{ele}</i>
                        </div>
                        <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                        <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                    </li>
        }))
    }

    const fillcareers = () => {
        const fillselect = datasite.profesion
        setfillcarr(fillselect.map((ele,x) => {
            return <option key={x+1} value={ele}>{ele}</option>
            })
        )
    }

    

    const insertTeacher = () => {

        if(!inp.current.value  || !inpcedula.current.value  || !inpPro.current.value  || !inpTel.current.value  || !inpDir.current.value ){
            Alertas('Información','Los campos no pueden estar vacíos')
            return false
        }
       const id = inpcedula.current.value 
       const validate = datasite.docentes.filter((ele) =>{
            return ele.inpcedula == id
        })
 
        if(validate.length){
            Alertas('Información','Ya existe un docente registrado con la cédula ',inpcedula.current.value)
            return false
        }


        const formdata = new FormData()
        formdata.append('inp',inp.current.value);
        formdata.append('inpcedula',inpcedula.current.value);
        formdata.append('inpPro',inpPro.current.value);
        formdata.append('inptel',inpTel.current.value);
        formdata.append('inpdir',inpDir.current.value);    
        formdata.append(`filesteacher`, inpFile?.current?.files.length??0);
        let cont = 0
        for (let file of inpFile?.current?.files) {
            formdata.append(`file-${cont++}`, file, file.name);
        }
        
        const obj = new Object();
        for (let pair of formdata.entries()) {
            obj[pair[0]] = pair[1]
        }

        setDatasite((prevState) => ({...prevState,docentes:[
                ...prevState.docentes,
                obj,
        ]}))
        setLoadteacher(true)
    }

    const loaddataTeacher = () =>{
            setFillteacher( datasite.docentes.map(({inp,inpPro,inpcedula},x) =>{
                return <li key={x} className="list-group-item d-flex text-start text-wrap">
                            <div className="ms-2 me-auto">
                                <div className='text-primary fw-bold'>{inp} - {inpcedula}</div>
                                    <i className="bi bi-arrow-right-circle ms-3">{inpPro}</i>
                            </div>
                            <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                            <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                        </li>
        }))
    }


    return(
        <main>
            <Menu flag='docentes' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar profesión</h3>
                            <div className="row align-items-center justify-content-center">
                                    <label htmlFor="inputNomProfesion" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre profesión</label>
                                    <div className="col-6">
                                        <input type="text" className="form-control border-primary" name='inputNomProfesion' id="inputNomProfesion"  ref={inputNomProfesion}/>
                                    </div>
                                </div>
                               <div className="text-center"> <button className='btn btn-primary my-3 ' onClick={insertBachelor}>Insertar</button></div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Profesiones</h3>
                            {fillpro != '' && <ul className="list-group border-0">
                                {fillpro}
                            </ul>}
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar docente</h3>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpTea" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre docente</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inpTea' id="inpTea"  ref={inp}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpcedula" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Cédula</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inpcedula' id="inpcedula"  ref={inpcedula}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpPro" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Profesión</label>
                                <div className="col-6">
                                    <select name='inpPro' id="inpPro"  ref={inpPro} className="form-select border-primary">
                                        <option key={0} value={''}>Selecciona profesión</option>
                                        {fillcarr}
                                    </select> 

                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpTel" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Teléfono</label>
                                <div className="col-6">
                                    <input type="tel" className="form-control border-primary" name='inpTel' id="inpTel"  ref={inpTel}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpDir" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Dirección</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inpDir' id="inpDir"  ref={inpDir}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <span className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Archivos</span>
                                <div className="col-6">
                                    <label htmlFor="inpFile" className="col-5 form-control form-control-sm border-ligth fs-4 fw-bold btn border-primary btn-sm">Subir archivos
                                        <input type="file" multiple className="form-control" name='inpFile' id="inpFile" style={{display:'none'}} accept="image/*,.pdf"  ref={inpFile}/>
                                    </label>
                                </div>
                            </div>
                            <div className="text-center"> 
                                <button className='btn btn-primary my-3 ' onClick={insertTeacher}>Insertar</button>
                            </div>

                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Docentes</h3>
                            {fillteacher != '' && <ul className="list-group border-0 w-100">
                                {fillteacher}
                            </ul>}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           