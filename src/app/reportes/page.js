"use client"
import { Alertas } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useRef } from 'react';

const metadata = {
    title: 'Reportes',
    description: 'Reportes',
  }
  

export default function Reportes(){    

    const textInput = useRef(null)
    const textInput2 = useRef(null)
    const textInput3 = useRef(null)

    const genenerateReport = (e) => {
        e.preventDefault()
        console.log('entro por aca ');
        let sql = ''
        const radioreport = document.querySelectorAll('input[type=radio]:checked')

        if(!radioreport.length){
            Alertas('Información','Debe seleccionar un tipo de reporte')
            return
        }
        if(textInput2.current.value && !textInput3.current.value){
            Alertas('Información','Debe seleccionar la fecha de fin')
            return
        }
        if(!textInput2.current.value && textInput3.current.value){
            Alertas('Información','Debe seleccionar la fecha de inicio')
            return
        }
        if(textInput2.current.value > textInput3.current.value){
            Alertas('Información','La fecha de inicio no puede ser mayor a la de fin ')
            return
        }
    }

    return(
        <main>
            <Menu flag='reportes' />  
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Generar reporte</h3>

                            <form method='POST' onSubmit={(e) => genenerateReport(e)}>
                             <div className='row align-items-center justify-content-center my-2 card-body'>
                                    <div className="col mb-3 ">
                                        <label className="form-label" htmlFor="repor_nom">Estudiante cedula</label>
                                        <input className="form-control border-primary " id="repor_nom" type="text" ref={textInput} />
                                    </div>
                                    <div className="col mb-3 ">
                                        <label className="form-label" htmlFor="report_ini">Fecha inicio</label>
                                        <input className="form-control border-primary " id="report_ini" type="date" ref={textInput2} />
                                    </div>
                                    <div className="col mb-3 ">
                                        <label className="form-label" htmlFor="report_fin">Fecha fin</label>
                                        <input className="form-control border-primary " id="report_fin" type="date" ref={textInput3} />
                                    </div>

                                    <div className="col-12 mb-3 ">
                                        <div className="form-check">
                                            <input className="form-check-input border-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="1"/>
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Reporte general
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input border-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Reporte por periodos
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input border-primary" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="3" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault3">
                                                Reporte por año
                                            </label>
                                        </div>
                                    </div>

                                    <div className="text-center"> <button className='btn btn-primary my-3 '>Generar reporte</button></div>

                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           