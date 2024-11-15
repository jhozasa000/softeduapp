"use client"
import { useEffect, useState } from 'react';
import styles from '../menu/menu.module.css'
import { Getdata } from './Getdata';

const Ads = () => {

    const [params, setParams] = useState(null);
    useEffect(() => {
        load()
    }, []);

    const load = () => {
        Getdata('anuncios/select').then(info => {
            setParams(info.data.map(({id,title,description,date}) => {
                        return <li key={id} className="list-group-item d-flex text-start text-wrap">
                        <div className="ms-2 me-auto">
                            <div className='text-primary fw-bold'>{title} <span className='text-black m-2'>{date}</span></div>
                                <i className="bi bi-arrow-right-circle ms-3">{description}</i>
                        </div>
                        
                    </li>
                })
            )
        })
    }

    return (
        <div className="">
            <div className={`card-body text-white`}>
                <ul className='list-group'>
                    {params}
                </ul>
            </div>
        </div>
    );
}

export default Ads;
