import Menu from "../components/menu/Menu"

export const metadata = {
    title: 'Estudiantes',
    description: 'Estudiantes',
  }

export default function Estudiantes(){    
    return(
        <main>
            <Menu flag='estudiantes' />
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar estudiante</h3>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                    <div className="card h-100">
                            <h3 className="my-2 text-center">Estudiantes</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )

}           