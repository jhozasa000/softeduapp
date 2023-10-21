"use client"
import 'dotenv/config'
import { Postdata } from "../components/functions/Postdata";
import { Alertas, FirstletterUpper } from "../components/functions/helpers";
import Menu from "../components/menu/Menu"
import { useRef } from 'react';
import html2pdf from 'html2pdf.js'

const metadata = {
    title: 'Reportes',
    description: 'Reportes',
  }

const folderReport = process.env.REACT_APP_FOLDER_REPORT

export default function Reportes(){    

    const textInput = useRef(null)
    const genenerateReport = (e) => {
        e.preventDefault()
        if(!textInput.current.value){
            Alertas('Información','Ingresa número de identificación del estudiante para generar el reporte de notas')
            return
        }
        const datos = {idnumber: textInput.current.value}

        Postdata('reportes/select',datos).then( info => {

            if(!info?.data?.length){
                Alertas('Información','No hay resultados con el dato ingresado')
                return false
            }

             info.data.map(({ id},x) =>{
                Postdata('notas/findnotes',{idstu:id}).then(respu => {
                    loadNotes(respu.data,info.data,x)
                })  
            })
        })
    }

    const loadNotes = (fillnotes,filldata,position) => {

        const {name,lastname,datebirth,numberid,email,telephone,nametip,namegra,namecal,namejor} = filldata[position]
        let theadinfo = ''
        let tbody = ''
        const quantity = 9

        theadinfo += `<tr><th colspan='12'>Nombre estudiante: ${FirstletterUpper(name)} ${FirstletterUpper(lastname)} - ${nametip} ${numberid} - ${datebirth}</th></tr><tr><th colspan='6'>Datos escolares: ${FirstletterUpper(namegra)} ${FirstletterUpper(namecal)} ${FirstletterUpper(namejor)}</th><th colspan='6'>Datos acudiente: ${telephone} - ${FirstletterUpper(email)} </th></tr>`

        for(let f = 0;f < 12;f++){

           if(f === 0){
             theadinfo += '<tr>'
           }
            let text = ''
            if(f === 0){
                text = 'Asignatura'
            }else if(f === 1){
                text = 'Periodo'
            }else if(f === 11){
                text = 'Nota final'
            }else{
                text = `Nota ${f -1}`
            }
             theadinfo += `<th class="text-center">${text}</th>`;
          if(f === 11){
            theadinfo += '</tr>'
          }
        }

        if(!fillnotes.length){
            tbody += `<tr><td class="text-center" colspan="12"><No hay asignaturas asociadas/td></tr>`
        }

        fillnotes.map(({name,period,notas},x) => {
            tbody += '<tr>'
            tbody += `<td class="negrilla"> ${FirstletterUpper(name)}</td>`
            tbody += `<td class="text-center">${period}</td>`

            const len = notas.length
            let pro = 0

            notas.map(({num}) => {
                tbody += `<td class="text-center">${num}</td>`
                pro += parseFloat(num)
            })

            for(let f = 0;f < (quantity - len);f++){
                tbody += `<td></td>`
            }
            
            let proFinal = pro / len
            tbody += `<td class="text-center">${proFinal.toFixed(1)}</td>`
            tbody += '</tr>'
        })
        
        
        
        let table = `<table class='table'><thead>${theadinfo}</thead><tbody>${tbody}</tbody></table>`

        const html = `<!DOCTYPE html>
                <html lang="es">  
                  <head>    
                    <title>Reporte de notas</title>    
                    <meta charset="UTF-8">
                    <meta name="title" content="Reporte notas">
                    <meta name="description" content="Generar reporte estudiante">    
                    <style type="text/css">
                    table {
                        border-collapse: collapse;
                        font-size:12px;
                        font-family: "Times New Roman", Times, serif;
                        width:100%;
                        border-color:#3386FF;
                      }
                      .text-center{
                          text-align:center;
                      }
                    th {
                        background: #2c7be5;
                        color:#ffffff;
                      }
                      
                      th, td {
                        border: 1px solid #ccc;
                        padding: 8px;
                      }
                      
                      tr:nth-child(even) {
                        background: rgba(44, 123, 229, 0.5);
                      }
                      .negrilla{
                        font-weight: bold;
                      }
                    </style>
                  </head>  
                  <body>    
                    <header>
                      <h1>Reporte de notas</h1>      
                    </header>
                    <section> 
                       <div class="table-responsive"> ${table} </div>
                    </section>
                  </body>  
                </html>`


        const div = document.getElementById('loadpdf')

        div.innerHTML = html

        var opt = {
            margin:       1,
            filename:     'reporte.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 4 },
            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
          
          // New Promise-based usage:
            html2pdf().set(opt).from(div).save();

    }

    return(
        <main>
            <title>{'Reportes'}</title>
            <Menu flag='reportes' />  
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Generar reporte de notas</h3>

                            <form method='POST' onSubmit={(e) => genenerateReport(e)}>
                             <div className='row align-items-center justify-content-center my-2 card-body'>
                                    <div className="col mb-3 ">
                                        <label className="form-label" htmlFor="repor_nom">Estudiante número de identificación</label>
                                        <input className="form-control border-primary "  id="repor_nom" type="number" ref={textInput} />
                                    </div>

                                    <div className="text-center"> <button className='btn btn-primary my-3 '>Generar reporte</button></div>

                                </div>
                            </form> 
                            <div className="container-fluid" id='loadpdf'></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           