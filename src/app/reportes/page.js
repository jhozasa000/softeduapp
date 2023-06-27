import Menu from "../components/menu/Menu"

export const metadata = {
    title: 'Reportes',
    description: 'Reportes',
  }

export default function Reportes(){    
    return(
        <main>
            <Menu flag='reportes' />  
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-12 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Generar reporte</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           