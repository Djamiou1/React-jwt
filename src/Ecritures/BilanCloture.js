import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Load } from '../styles/Load';

export default function BilanCloture() {
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
    let  totalActif = 0;
    let  totalPassif = 0, result = 0, tva_due = 0;
    
            
    return (
        <div style={{ marginTop: 20 }} className="container">
            <Link to='/Ecriture' className='btn btn-dark'>Rétour</Link>
            <h3 className='text-secondary mt-3'>Bilan de clôture</h3>
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

                                // Totaux debuts et mouvements
                                let DebutDebitActif = 0;
                                let DebutCreditActif = 0;
                                let MouvementDebitActif = 0; 
                                let MouvementCreditActif = 0;    
                            
                                if(compte.typeCompte === 'actif'){
                                    return (
                                        <tr>
                                            <td>{ compte.libelle }</td>
                                            <td className='text-end'>
                                                { 
                                                    // eslint-disable-next-line array-callback-return 
                                                    APIDataEcriture.map((ecrture) => {
                                                        // eslint-disable-next-line eqeqeq
                                                        if(ecrture.numeroCompte == compte.numero){
                                                            // eslint-disable-next-line eqeqeq
                                                            if(ecrture.codeJournal == 'JAN'){
                                                                DebutDebitActif +=  ecrture.debit;
                                                                DebutCreditActif += ecrture.credit;
                                                            
                                                            }else{
                                                                MouvementDebitActif += ecrture.debit;
                                                                MouvementCreditActif += ecrture.credit;
                                                            }
                                                        }
                                                    })
                                                }
                                                { 
                                                  (function getSolde(){
                                                    if(DebutDebitActif-DebutCreditActif+MouvementDebitActif-MouvementCreditActif > 0){
                                                        totalActif += DebutDebitActif-DebutCreditActif+MouvementDebitActif-MouvementCreditActif;
                                                        return DebutDebitActif-DebutCreditActif+MouvementDebitActif-MouvementCreditActif;
                                                    }else{
                                                        return 0;
                                                    }
                                                  })()
                                                }
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

                                 // Totaux debuts et mouvements
                                 let DebutDebitPassif = 0;
                                 let DebutCreditPassif = 0;
                                 let MouvementDebitPassif = 0; 
                                 let MouvementCreditPassif = 0; 
                            
                            if(compte.typeCompte === 'passif'){
                                return (
                                    <tr>
                                        <td>{ compte.libelle }</td>
                                        <td className='text-end'>
                                        { 
                                                    // eslint-disable-next-line array-callback-return 
                                                    APIDataEcriture.map((ecrture) => {
                                                        // eslint-disable-next-line eqeqeq
                                                        if(ecrture.numeroCompte == compte.numero){
                                                            // eslint-disable-next-line eqeqeq
                                                            if(ecrture.codeJournal == 'JAN'){
                                                                DebutDebitPassif +=  ecrture.debit;
                                                                DebutCreditPassif += ecrture.credit;
                                                            
                                                            }else{
                                                                MouvementDebitPassif += ecrture.debit;
                                                                MouvementCreditPassif += ecrture.credit;
                                                            }
                                                        }
                                                    })
                                                }
                                                { 
                                                  (function getSolde(){
                                                    if(DebutDebitPassif-DebutCreditPassif+MouvementDebitPassif-MouvementCreditPassif < 0){
                                                        totalPassif += -1*(DebutDebitPassif-DebutCreditPassif+MouvementDebitPassif-MouvementCreditPassif);
                                                        return -1*(DebutDebitPassif-DebutCreditPassif+MouvementDebitPassif-MouvementCreditPassif);
                                                    }else{
                                                        return 0;
                                                    }
                                                  })()
                                                }
                                        </td>
                                    </tr>
                                  )
                            }
                                })}
                                <tr>
                                    <td>Résultat</td>
                                    <td className='text-end'>{ result }</td>
                                </tr>
                                <tr>
                                    <td>TVA due</td>
                                    <td className='text-end'>{ tva_due }</td>
                                </tr>
                                <tr className="text-center bg-light">
                                    <th>Total</th>
                                    <th className='text-end'>
                                        { 
                                          (
                                            function getTotal(){
                                                return  totalPassif+result+tva_due;
                                            }
                                          )() 
                                        }
                                    </th>
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