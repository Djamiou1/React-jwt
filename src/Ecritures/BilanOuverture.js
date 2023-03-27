import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Load } from '../styles/Load';

export default function BilanOuverture() {
    const [isDataLoading, setDataLoading] = useState(false)
    const [APIData, setAPIData] = useState([]);
    const [APIDataEcriture, setAPIDataEcriture] = useState([]);

//    récupérations des écritures
    useEffect(() => {
        setDataLoading(true)
        axios.get(`http://localhost:8000/api/ecritures`)
            .then((ecriture) => {
                setAPIDataEcriture(ecriture.data);
                setDataLoading(false)
            })
    }, [])

// récupérations des comptes
    useEffect(() => {
        setDataLoading(true)
        axios.get(`http://localhost:8000/api/comptes`)
            .then((compte) => {
                setAPIData(compte.data);
                setDataLoading(false)
            })
    }, [])
    
    // Montant & totaux 
    let  montantActif;
    let  totalActif = 0;
    let  montantPassif;
    let  totalPassif = 0;    
            
    return (
        <div style={{ marginTop: 20 }} className="container">
            <Link to='/Ecriture' className='btn btn-dark'>Rétour</Link>
            <h3 className='text-secondary mt-3'>Bilan d'ouverture</h3>
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-4'>
                    <table className='table table-bordered mt-4'>
                    <thead>
                        <tr className='bg-light'>
                            <th colSpan={2} className="text-center">Actif</th>
                        </tr>
                        <tr className='text-center bg-light'>
                            <th>Poste</th>
                            <th>Montant</th>
                        </tr>
                    </thead>

                    {isDataLoading ? (
                        <tbody className='border-0'>
                            <tr className='border-0 text-center'>
                               <td colSpan={2} className='text-center border-0 p-4'>
                                Chargement...
                               </td>
                            </tr>
                        </tbody>
                        ) : (
                        <tbody>
                        {
                            // eslint-disable-next-line array-callback-return
                            APIData.map((compte) => {
                            
                                if(compte.typeCompte === 'actif'){
                                    return (
                                        <tr>
                                            <td>{ compte.libelle }</td>
                                            <td className='text-end'>
                                                { 
                                                   // eslint-disable-next-line array-callback-return
                                                   APIDataEcriture.map((ecrture) => {
                                                     // eslint-disable-next-line eqeqeq
                                                     if(ecrture.numeroCompte == compte.numero && ecrture.codeJournal === 'JAN'){
                                                        if(ecrture.debit != null){
                                                            montantActif = ecrture.debit;
                                                        }else{
                                                            montantActif = 0;
                                                        }
                                                        totalActif += montantActif;
                                                     }
                                                   })
                                                }
                                                { montantActif }
                                            </td>
                                        </tr>
                                      )
                                }
                                })}
                                <tr className="text-center bg-light">
                                    <th>Total</th>
                                    <th  className='text-end'>{ totalActif }</th>
                                </tr>     
                    </tbody>
                        ) }
                </table>
              </div>
              <div className='col-md-4'>
                    <table className='table table-bordered mt-4'>
                    <thead>
                        <tr className='bg-light'>
                            <th colSpan={2} className="text-center">Passif</th>
                        </tr>
                        <tr className='text-center bg-light'>
                            <th>Poste</th>
                            <th>Montant</th>
                        </tr>
                    </thead>

                    {isDataLoading ? (
                        <tbody className='border-0'>
                            <tr className='border-0 text-center'>
                               <td colSpan={2} className='text-center border-0 p-4'>
                                Chargement...
                               </td>
                            </tr>
                        </tbody>
                        ) : (
                        <tbody>
                        {
                            // eslint-disable-next-line array-callback-return
                            APIData.map((compte) => {
                            
                            if(compte.typeCompte === 'passif'){
                                return (
                                    <tr>
                                        <td>{ compte.libelle }</td>
                                        <td className='text-end'>
                                            { 
                                               // eslint-disable-next-line array-callback-return
                                               APIDataEcriture.map((ecrture) => {
                                                 // eslint-disable-next-line eqeqeq
                                                 if(ecrture.numeroCompte == compte.numero && ecrture.codeJournal === 'JAN'){
                                                    montantPassif = ecrture.credit;
                                                    totalPassif += montantPassif;
                                                 }
                                               })
                                            }
                                            { montantPassif }
                                        </td>
                                    </tr>
                                  )
                            }
                                })}
                                <tr className="text-center bg-light">
                                    <th>Total</th>
                                    <th className='text-end'>{ totalPassif }</th>
                                </tr>     
                    </tbody>
                        ) }
                </table>
              </div>
              <div className='col-md-2'></div>
            </div>
        </div>
    )
}