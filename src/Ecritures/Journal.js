import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Load } from '../styles/Load';

export default function Journal() {
    const [isDataLoading, setDataLoading] = useState(false)
    const [APIData, setAPIData] = useState([]);

    useEffect(() => {
        setDataLoading(true)
        axios.get(`http://localhost:8000/api/ecritures`)
            .then((response) => {
                setAPIData(response.data);
                setDataLoading(false)
            })
    }, [])

    const setData = (data) => {
        let { id, date, libelle, numeroCompte, debit, credit, codeJournal } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('date', date);
        localStorage.setItem('codeJournal', codeJournal);
        localStorage.setItem('libelle', libelle);
        localStorage.setItem('numeroCompte', numeroCompte);
        localStorage.setItem('debit', debit);
        localStorage.setItem('credit', credit);
     }

     const onDelete = (id) => {
        axios.delete(`http://localhost:8000/api/ecriture/${id}`)
        .then((response) => {
            getData();
        })
      }

      const getData = () => {
        axios.get(`http://localhost:8000/api/ecritures`)
            .then((getData) => {
                 setAPIData(getData.data);
             })
    }

    return (
        <div style={{ marginTop: 20 }} className="container">
            <Link className="btn btn-dark" to="/Ecriture">Rétour</Link>
            <h3 className='text-secondary mt-3'>Journal des écritures</h3>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Numero de compte</th>
                        <th>Libellé</th>
                        <th>Débit</th>
                        <th>Crédit</th>
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
                         <td></td>
                         <div className="py-4">
                           <Load />
                         </div>
                         <td></td>
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
                                <td>{data.numeroCompte}</td>
                                <td>{data.libelle}</td>
                                <td>{data.debit}</td>
                                <td>{data.credit}</td>
                                <td>
                                  <td className='btn btn-secondary m-1'>
                                    <Link to='/JournalUpdate' className='text-white' onClick={() => setData(data)}> 
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