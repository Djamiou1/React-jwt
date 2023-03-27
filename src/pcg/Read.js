import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Load } from '../styles/Load';

export default function Read() {
    const [isDataLoading, setDataLoading] = useState(false)
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        setDataLoading(true)
        axios.get(`http://localhost:8000/api/comptes`)
            .then((response) => {
                setAPIData(response.data);
                setDataLoading(false)
            })
    }, [])

    const setData = (data) => {
        let { id, numero, libelle, typeCompte } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('numero', numero);
        localStorage.setItem('libelle', libelle);
        localStorage.setItem('typeCompte', typeCompte);
     }

     const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/compte/${id}`)
        .then((response) => {
            getData();
        })
      }

      const getData = () => {
        axios.get(`http://localhost:8000/api/comptes/`)
            .then((getData) => {
                 setAPIData(getData.data);
             })
    }

    return (
        <div style={{ marginTop: 20 }} className="container">
            <Link className="btn btn-dark" to="/Planform">Ajouter un compte</Link>
            <h3 className='text-secondary mt-3'>Plan comptable</h3>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Numero de compte</th>
                        <th>Libellé</th>
                        <th>
                            <tr>
                                <th>Modifier</th>
                                <span className='mx-1 text-silver'>|</span>
                                <th>Supprimer</th>
                            </tr>
                        </th>
                    </tr>
                </thead>

                {isDataLoading ? (
                     <tbody>
                     <tr>
                         <td></td>
                         <td></td>
                         <div className="py-4">
                           <Load />
                         </div>
                         <td></td>
                         <td></td>
                     </tr>
                     
                  </tbody>
                    ) : (
                        <tbody>
                        {APIData.map((data, index) => {
                            return (
                                
                             <tr>
                                <td>{index+1}</td>
                                <td>{data.numero}</td>
                                <td>{data.libelle}</td>
                                <td>
                                  <td className='btn btn-secondary  m-1'>
                                    <Link to='/update' className='text-white' onClick={() => setData(data)}> 
                                        Modifier
                                    </Link>
                                  </td>
                                  <td className='btn btn-secondary m-1' onClick={() => onDelete(data.id)}>
                                       Supprimer
                                 </td>
                                </td>
                             </tr>
                        )})}
                  </tbody>
                    )}
            </table>
        </div>
    )
}