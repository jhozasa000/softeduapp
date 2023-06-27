import Menu from "../components/menu/Menu"

  export const metadata = {
    title: 'Materias',
    description: 'Materias',
  }

export default function Materias(){   
    return(
        <main>
            <Menu flag='materias' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar materia</h3>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                    <div className="card h-100">
                            <h3 className="my-2 text-center">Materias</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           