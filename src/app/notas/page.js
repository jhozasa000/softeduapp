"use client"
import { Reducer } from "../components/context/themecontext";
import Menu from "../components/menu/Menu"
import { useRef, useState , useEffect } from 'react';

const metadata = {
    title: 'Notas',
    description: 'Notas',
  }

export default function Notas(){    

    const inputSearch = useRef(null)
    const { datasite, setDatasite } = Reducer();
    const [loaddatastu, setLoaddatastu] = useState(false);

    useEffect(() => {       
        loadNotes()
        return () => console.log("Cleanup..");
    },[loaddatastu]);


    const loadNotes = () => {
        
        let cont = document.getElementById('fillnote');
        cont.innerHTML = ''
        const quantity = 11

        datasite.notas.map((no,n) =>{
            const tbl = document.createElement("table")
            const tblBody = document.createElement("tbody")

            const tblHead = document.createElement("thead")
            const trhead = document.createElement('tr')
            

            for(let f = 0;f < 12;f++){
                const thhead = document.createElement('th')
                thhead.setAttribute('class','text-center')
                let text = ''
                if(f === 0){
                    text = 'Asignatura'
                }else if(f === 1){
                    text = 'Periodo'
                }else if(f === 11){
                    text = 'Nota final'
                }else{
                    text = `Nota ${f}`
                }
                const cellText = document.createTextNode(text);
                thhead.appendChild(cellText);
                trhead.appendChild(thhead);
            }

            tblHead.appendChild(trhead)
            tbl.appendChild(tblHead)


            no.materias.map((mat,m) =>  {
            const len = mat.length
            let tbtr = ''
            let pro = 0
                mat.map((asig,x) => {
                    let td = document.createElement('td')
                    if(parseInt(x) === 0){
                        tbtr = document.createElement('tr')
                    }else{
                        td.setAttribute('class','text-center')
                    }
                    if(x > 1){
                        pro += parseInt(asig)
                    }
                    const cellText = document.createTextNode(asig);
                    td.appendChild(cellText);
                    tbtr.appendChild(td);

                })  
                tblBody.appendChild(tbtr)

                for(let f = 0;f < (quantity - len);f++){
                    let td = document.createElement('td')
                    const cellText = document.createTextNode('');
                    td.appendChild(cellText);
                    tbtr.appendChild(td);
                }
                let td = document.createElement('td')
                td.setAttribute('class','text-center')
                let proFinal = pro / (len -2)
                const cellText = document.createTextNode(proFinal.toFixed(2));
                td.appendChild(cellText);
                tbtr.appendChild(td);

            })

            console.log('no cedula  ', no.idstunota);

            tbl.setAttribute('class', 'table table-bordered border-primary table-sm table-striped')
            tbl.appendChild(tblBody)
            cont.appendChild(tbl)

        })
    }

    return(
        <main>
            <Menu flag='notas' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12  mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar nota</h3>
                            <div className="row align-items-center justify-content-center mb-4">
                                <label htmlFor="inputSearch" className="col-5 col-form-label col-form-label-sm fs-4 fw-bold">Buscar estudiante o grado</label>
                                <div className="col-6">
                                    <input type="search" className="form-control border-primary" name='inputSearch' id="inputSearch"  ref={inputSearch}/>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="col-sm-12  mb-2">
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Notas</h3>
                                <div className="container-fluid mt-5"> 
                                    <div id="fillnote"></div>
                                    <table className="table table-bordered border-primary table-sm table-striped">
                                       
                                    </table>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           