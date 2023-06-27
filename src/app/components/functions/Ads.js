import styles from '../menu/menu.module.css'

const params = [
    {id:0,title:'Reunión padres',description:'Debatir los temas del colegio y revisión de notas',date:'2023/08/16'},
    {id:1,title:'Reunión docentes',description:'Planificar actividades 4 semestre',date:'2023/09/09'},
    {id:2,title:'Día deportivo',description:'Día libre para los docentes y alumnos para disfrutar en la finca del colegio',date:'2023/09/10'},
]

const Ads = () => {
    return (
        <div className="card">
            <div className={`card-body text-white ${styles.navblue}`}>
                <ul className='list-group'>
                    {params.map( ({title, description,date,id}) => {
                        return <li key={id} className="list-group-item d-flex text-start text-wrap">
                                    <div className="ms-2 me-auto">
                                        <div className='text-primary fw-bold'>{title}</div>
                                            <i className="bi bi-arrow-right-circle ms-3">{description}</i>
                                    </div>
                                    <span>{date}</span>
                                </li>
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Ads;
