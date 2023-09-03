"use client"
import { Reducer } from "../components/context/themecontext";
import { Getdata } from "../components/functions/Getdata";
import { Postdata } from "../components/functions/Postdata";
import { Putdata } from "../components/functions/Putdata";
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';


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
    const [btnpro, setBtnpro] = useState('Insertar');

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
        const datos = {
            name:inpNomPro,
        }
        Postdata('profesion/select',datos).then((ele) => {
            if(ele?.data?.length){
                Alertas('Información','Ya existe la profesion')
                return false
            }else{
                Postdata('profesion/insert',datos).then((res) => {
                    if(res?.data?.affectedRows > 0){
                        Alertas('Información', `Se inserto la profesion en el sistema`)
                        inputNomProfesion.current.value = ''
                        setLoadpro(true)
                    }
                })
            }
          })
    }

    const loaddata = () =>{
        Getdata('profesion/select').then((info)=>{
            setFillpro( info.data.map(({id, name},x) =>{

                const profesiondelete = (id) =>{
                    const datos = {
                        id:id
                    }
                    Swal.fire({
                        title: `<strong>¿Desea eliminar: ${name}?</strong>`,
                        showDenyButton: false,
                        showCancelButton: true,
                        confirmButtonText:'Eliminar',
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#3085d6',
                        cancelButtonText:'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            Putdata('profesion/delete',datos).then(res => {
                                if(res?.data?.affectedRows > 0 ){
                                    Alertas('Información',`Se eliminó la profesión ${name} del sistema`)
                                    setLoadpro(true)
                                }
                            })
                        } 
                    })
                }


                return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                            <div className="ms-2 me-auto ">
                                <i className="bi bi-arrow-right-circle ms-3">{name}</i>
                            </div>
                            <span><a onClick={() => profesiondelete(id)}><i className="bi bi-trash fs-4 px-2 text-danger"></i></a></span>
                            <span><a onClick={() => profesionedit(info.data[x])}><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></a></span>
                        </li>
            }))
        })   
    }

    const profesionedit = ({id,name}) => {
        setBtnpro("Actualizar")
        inputNomProfesion.current.value = name
        const div = document.getElementById("btnprochange")
        div.innerHTML = ""

        const btnedit = document.createElement('button')
        btnedit.setAttribute('class', 'btn btn-primary mx-3 my-3')
        btnedit.innerText = "Actualizar"
        btnedit.id = 'btn_insert_sche'
        btnedit.name = 'btn_insert_sche'
        btnedit.onclick = function() { profesionupdate(id) }

        const btncancel = document.createElement('button')
        btncancel.setAttribute('class', 'btn btn-primary mx-3 my-3')
        btncancel.innerText = "Cancelar"
        btncancel.id = 'btn_cancel_sche'
        btncancel.name = 'btn_cancel_sche'
        btncancel.onclick = function() { profesioncancel() }

        div.appendChild(btnedit)
        div.appendChild(btncancel)

    }

    const profesioncancel = () => {
        const div = document.getElementById("btnprochange")
        div.innerHTML = ""

        const btnedit = document.createElement('button')
        btnedit.setAttribute('class', 'btn btn-primary my-3')
        btnedit.innerText = "Insertar"
        btnedit.id = 'btn_insert_sche'
        btnedit.name = 'btn_insert_sche'
        btnedit.onclick = function() { insertBachelor() }
        div.appendChild(btnedit)
        setBtnpro('Insertar')
        inputNomProfesion.current.value = ''
    }

    const profesionupdate = (id) => {
        const value = inputNomProfesion.current.value.trim()
        if(!value){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }
        const datos = {
            name: value,
            id:  id
        }

        Postdata('profesion/select',datos).then((ele) => {
            if(ele?.data?.length){
                Alertas('Información','Ya existe el profesion con ese nombre')
                return false
            }else{
                Putdata('profesion/edit',datos).then((res) => {
                    if(res?.data?.affectedRows > 0){
                        const div = document.getElementById("btnprochange")
                        div.innerHTML = ""

                        const btnedit = document.createElement('button')
                        btnedit.setAttribute('class', 'btn btn-primary my-3')
                        btnedit.innerText = "Insertar"
                        btnedit.id = 'btn_insert_sche'
                        btnedit.name = 'btn_insert_sche'
                        btnedit.onclick = function() { insertBachelor() }
                        div.appendChild(btnedit)
                        setBtnpro('Insertar')
                        Alertas('Información', `Se actualizo la profesion en el sistema`)
                        inputNomProfesion.current.value = ''
                        setLoadpro(true)
                        
                    }
                })
            }
        })
    }

    const fillcareers = () => {
        Getdata('profesion/select').then((info)=>{
            setfillcarr( info.data.map(({id, name},x) =>{
                return <option key={x+1} value={id}>{name}</option>

            }))
        })
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
                            <h3 className="my-2 text-center">{btnpro} profesión</h3>
                            <div className="row align-items-center justify-content-center">
                                    <label htmlFor="inputNomProfesion" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombre profesión</label>
                                    <div className="col-6">
                                        <input type="text" className="form-control border-primary" name='inputNomProfesion' id="inputNomProfesion"  ref={inputNomProfesion}/>
                                    </div>
                                </div>
                               <div className="text-center" id="btnprochange"> <button className='btn btn-primary my-3 ' onClick={insertBachelor}>Insertar</button></div>
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