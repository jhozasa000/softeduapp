"use client"
import { Getdata } from "../components/functions/Getdata";
import { Reducer } from "../components/context/themecontext";
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useEffect, useRef, useState } from 'react';
import { Postdata } from "../components/functions/Postdata";

const metadata = {
    title: 'grados',
    description: 'grados',
  }

export default function Grados(){    

    const inputNomCourse = useRef(null);
    const inputcal = useRef(null);
    const inputjor = useRef(null);
    const { datasite, setDatasite } = Reducer();
    const [loadcourse, setLoadcourse] = useState(false);
    const [fillcor, setFillcor] = useState('');
    const [fillcal, setFillcal] = useState(true);
    const [fillday, setFillday] = useState(true);

    useEffect(() => {
            Getdata('calendario/select').then((info)=>{
                setFillcal( info.data.map(({id, name},x) =>{
                    return <option key={x+1} value={id}>{name}</option>

                }))
            })

            Getdata('jornada/select').then((info)=>{
                setFillday( info.data.map(({id, name},x) =>{
                    return <option key={x+1} value={id}>{name}</option>

                }))
            })
            loaddata()
    }, [loadcourse]);

    const insertCourse = () =>{
        const inpGr = inputNomCourse.current.value.trim()
        const inpJo = inputjor.current.value
        const inpCa = inputcal.current.value
        
        if(!inpGr || !inpCa || !inpJo){
            Alertas('Información','El campo no puede estar vacío')
            return false
        }
        const datos = {
            name:inpGr,
            idcal:inpCa,
            idjor:inpJo
        }

        console.log('datos  :: ', datos);

        Postdata('grados/select',datos).then((ele) => {
            if(ele?.data?.length){
                Alertas('Información','Ya existe el grado')
                return false
            }else{
                Postdata('grados/insert',datos).then((res) => {
                    if(res?.data?.affectedRows > 0){
                        Alertas('Información', `Se inserto el grado en el sistema`)
                        inputNomCourse.current.value = ''
                        inputjor.current.value = ''
                        inputcal.current.value = ''
                        setLoadcourse(true)
                    }
                })
            }
          })
    }

    const loaddata = () =>{

        Getdata('grados/select').then((info)=>{
            setFillcor( info.data.map(({idgra, namegra,namecal,namejor},x) =>{
                return <li key={x} className="list-group-item d-flex border-0 align-items-center justify-content-center">
                        <div className="ms-2 me-auto">
                                <div className='text-primary fw-bold'>{namegra}</div>
                                    <i className="bi bi-arrow-right-circle ms-3">{namecal} - {namejor}</i>
                            </div>
                        <span><i className="bi bi-trash fs-4 px-2 text-danger"></i></span>
                        <span><i className="bi bi-pencil-square fs-4 px-2 text-success"></i></span>
                    </li>
            }))
        })
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