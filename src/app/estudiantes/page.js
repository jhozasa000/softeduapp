"use client"
import { Reducer } from "../components/context/themecontext";
import { Getdata } from "../components/functions/Getdata";
import Menu from "../components/menu/Menu"
import { useRef, useEffect } from 'react';
import { useState } from 'react';

const metadata = {
    title: 'Estudiantes',
    description: 'Estudiantes',
  }

export default function Estudiantes(){    
    const inpStu = useRef(null)
    const inpLast = useRef(null)
    const inpBir = useRef(null)
    const inpTelfamilia = useRef(null)
    const inpMail = useRef(null)
    const inpGra = useRef(null)
    const inpStudent = useRef(null)
    const inpId = useRef(null)

    const { datasite, setDatasite } = Reducer();
    const [fillstu, setFillstu] = useState('');
    const [load, setLoad] = useState(true);
    const [loadrel, setLoadrel] = useState(true);
    const [fillgrade, setFillgrade] = useState('');
    const [fillstudent, setFillstudent] = useState('');
    const [fillrela, setFillrela] = useState('');

    const [filltipo, setFilltipo] = useState('');

    useEffect(() => {
        loaddata()
        setLoad(false)
    },[load]);

    useEffect(() => {
        filldatarelationship()
        loaddatarelationship()
        setLoadrel(false)
    },[loadrel]);

    const insertStudent = () => {
        const name = inpStu.current.value.trim()
        const lastname = inpLast.current.value.trim()
        const typeid = inpId.current.value
        const datebirth = inpBir.current.value.trim()
        const telephone = inpTelfamilia.current.value.trim()
        const email = inpMail.current.value.trim()
        
        if(!inpNomPro){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }
        const datos = {
            name:inpNomPro,
        }
        Postdata('estudiantes/select',datos).then((ele) => {
            if(ele?.data?.length){
                Alertas('Información','Ya existe la estudiantes')
                return false
            }else{
                Postdata('estudiantes/insert',datos).then((res) => {
                    if(res?.data?.affectedRows > 0){
                        Alertas('Información', `Se inserto la estudiantes en el sistema`)
                        inputNomestudiantes.current.value = ''
                        setLoadrela(true)
                    }else if(res?.data?.error){
                        Alertas('Información', res.data.error)
                        return false
                    }
                })
            }
          })
    }

    const loaddata = () =>{

        Getdata('tipoidentificacion/select').then((info)=>{
            setFilltipo( info.data.map(({id, name},x) =>{
                return <option key={x+1} value={id}>{name}</option>
            }))
        })

        Getdata('estudiantes/select').then((info)=>{
            setFillstu( info.data.map(({id, name,lastname,numberid,telephone},x) =>{
                return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                            <div className="ms-2 me-auto">
                                    <div className='text-primary fw-bold'>{name}  {lastname} - {numberid}</div>
                                        <i className="bi bi-arrow-right-circle ms-3">Tel. Acudiente:    {telephone}</i>
                                </div>
                            <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                            <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                        </li>
            }))
        })

    }


    const filldatarelationship =() =>{

        Getdata('grados/select').then((info)=>{
            setFillgrade( info.data.map(({idgra, namegra,namecal,namejor},x) =>{
                return <option key={x+1} value={idgra}>{namegra +' - '+ namecal  +' - '+ namejor}</option>
            }))
        })      

        //select relacion de estudiante materia
        Getdata('estudiantes/select').then((info)=>{
            setFillrela( info.data.map(({id, name,numberid},x) =>{
                return <option key={x+1} value={id}>{name}  {numberid}</option>
            }))
        })
    }

    const insertRelationshipsstu = () => {
        console.log('prueba de estudiante relacion');

    }

    const loaddatarelationship = () =>{

        setFillrela( datasite.estudiantesrelacion.map(({idstu,idgrade},x) =>{
             return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto">
                                <div className='text-primary fw-bold'>Id estudiante - {idstu}</div>
                                    <i className="bi bi-arrow-right-circle ms-3">Grado:    {idgrade}</i>
                            </div>
                        <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                        <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                    </li>
        }))
    }

    return(
        <main>
            <Menu flag='estudiantes' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar estudiante</h3>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpStu" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Nombres estudiante</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inpStu' id="inpStu"  ref={inpStu}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpLast" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Apellidos estudiante</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inpLast' id="inpLast"  ref={inpLast}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpId" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Tipo identificación</label>
                                <div className="col-6">
                                    <select className="form-select border-primary">
                                        <option key={0} value={''}>Selecciona tipo</option>
                                        {filltipo}
                                    </select>
                                </div>
                            </div>
                            
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpId" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Identificación estudiante</label>
                                <div className="col-6">
                                    <input type="text" className="form-control border-primary" name='inpId' id="inpId"  ref={inpId}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpBir" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Fecha de nacimiento</label>
                                <div className="col-6">
                                    <input type="date" className="form-control border-primary" name='inpBir' id="inpBir"  ref={inpBir}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpTelfamilia" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Teléfono acudiente</label>
                                <div className="col-6">
                                    <input type="tel" className="form-control border-primary" name='inpTelfamilia' id="inpTelfamilia"  ref={inpTelfamilia}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center my-2">
                                <label htmlFor="inpMail" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Correo acudiente</label>
                                <div className="col-6">
                                    <input type="email" className="form-control border-primary" name='inpMail' id="inpMail"  ref={inpMail}/>
                                </div>
                            </div>
                            <div className="text-center"> <button className='btn btn-primary my-3 ' onClick={insertStudent}>Insertar</button></div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Estudiantes</h3>
                            {fillstu != '' && <ul className="list-group border-0">
                                {fillstu}
                            </ul>}
                        </div>
                    </div>

                    <div className="col-sm-12 col-md-12 mb-2" >
                        <div className="card h-100">
                        <h3 className="my-2 text-center">Relación estudiante - grado</h3>

                        <div className="row">
                            <div className="col-sm-12 col-md-6">
                                <div className="form-floating">
                                    <select className="form-select" id="inpStudent" ref={inpStudent}>
                                        <option key={0} value={''}>Selecciona estudiante</option>
                                        {fillstudent}
                                    </select>
                                    <label htmlFor="inpGra">Estudiante</label>
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="form-floating">
                                    <select className="form-select" id="inpGra" ref={inpGra}>
                                        <option key={0} value={''}>Selecciona grado</option>
                                        {fillgrade}
                                    </select>
                                    <label htmlFor="inpGra">Grado</label>
                                </div>
                            </div>
                            <div className="text-center"> <button className='btn btn-primary my-3 ' onClick={insertRelationshipsstu}>Insertar</button></div>

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