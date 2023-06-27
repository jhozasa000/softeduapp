import Menu from "../components/menu/Menu"

export const metadata = {
  title: 'Usuarios',
  description:'Usuarios'
}

export default function Usuarios(){
  return (
          <main>
            <Menu flag='usuarios' /> 
            <div className="container-fluid mt-5"> 
                <div className="row">
                    <div className="col-sm-12 col-md-6 mb-2" >
                        <div className="card h-100">
                            <h3 className="my-2 text-center">Insertar usuario</h3>
                        </div>
                        
                    </div>
                    <div className="col-sm-12 col-md-6 mb-2">
                    <div className="card h-100">
                            <h3 className="my-2 text-center">Usuarios</h3>
                        </div>
                    </div>
                </div>
            </div>
            </main>
          )
}