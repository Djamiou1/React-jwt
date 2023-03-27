import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Load } from '../styles/Load';

export default function Balance() {
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
    
    // Totaux soldes debuts et mouvements
        let totalSoldeDebutDebit = 0;
        let totalSoldeDebutCredit = 0;
        let totalMouvementDebit = 0; 
        let totalMouvementCredit = 0;
        
        // eslint-disable-next-line array-callback-return 
        APIDataEcriture.map((dataEcriture) => {
            // eslint-disable-next-line eqeqeq
            if(dataEcriture.codeJournal == 'JAN'){
                totalSoldeDebutDebit +=  dataEcriture.debit;
                totalSoldeDebutCredit += dataEcriture.credit;
                
            }else{
                totalMouvementDebit += dataEcriture.debit;
                totalMouvementCredit += dataEcriture.credit;
            }
         })

    // totaux soldes finaux
         let accumulateurSFD = 0;
         let accumulateurSFC = 0;
         let soldeFinalDebit = 0;
         let soldeFinalCredit = 0;
            
    return (
        <div style={{ marginTop: 20 }} className="container">
            <Link to='/Ecriture' className='btn btn-dark'>Rétour</Link>
            <h3 className='text-secondary mt-3'>Balance des comptes</h3>
            <table className='table table-bordered mt-4'>
                <thead>
                    <tr className='bg-light'>
                        <th rowSpan={2} className="py-4 text-center">N°</th>
                        <th rowSpan={2} className="py-4 text-center">N° compte</th>
                        <th rowSpan={2} className="py-4 text-center">Libellé</th>
                        <th colSpan={2} className="text-center">Solde d'ouverture</th>
                        <th colSpan={2} className="text-center">Mouvement</th>
                        <th colSpan={2} className="text-center">Solde de clôture</th>
                    </tr>
                    <tr className='bg-light'>
                        <th className="text-center">Débit</th>
                        <th className="text-center">Credit</th>
                        <th className="text-center">Débit</th>
                        <th className="text-center">Credit</th>
                        <th className="text-center">Débit</th>
                        <th className="text-center">Credit</th>
                    </tr>
                </thead>

                {isDataLoading ? (
                    <tbody className='border-0'>
                        <tr className='border-0'>
                            <td className='border-0'></td>
                            <td className='border-0'></td>
                            <td className='border-0'></td>
                            <td className='border-0'></td>
                            <td className="border-0 p-4">
                              <Load />
                            </td>
                            <td className='border-0'></td>
                            <td className='border-0'></td>
                            <td className='border-0'></td>
                            <td className='border-0'></td>
                        </tr>
                     </tbody>
                    ) : (
                    <tbody>
                    { APIData.map((compte, index) => {

                             let soldeDebutDebit = 0;
                             let soldeDebutCredit = 0;
                             let mouvementDebit = 0; 
                             let mouvementCredit = 0;

                             return (
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{compte.numero}</td>
                                    <td>{compte.libelle}</td>
                                    
                                    <td className="text-end">
                                        {
                                        // eslint-disable-next-line array-callback-return
                                         APIDataEcriture.map((dataEcriture) => {
                                                    // eslint-disable-next-line eqeqeq
                                                    if(dataEcriture.codeJournal == 'JAN'){
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.numeroCompte == compte.numero){
                                                            soldeDebutDebit += dataEcriture.debit;
                                                        }
                                                    }
                                                })
                                        }
                                                { soldeDebutDebit }
                                    </td>
                                    <td className="text-end">
                                        {
                                        // eslint-disable-next-line array-callback-return
                                         APIDataEcriture.map((dataEcriture) => {
                                                
                                                    // eslint-disable-next-line eqeqeq
                                                    if( dataEcriture.codeJournal == 'JAN'){
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.numeroCompte ==  compte.numero){
                                                            soldeDebutCredit += dataEcriture.credit;
                                                        }
                                                    }
                                                })
                                        }
                                                { soldeDebutCredit }
                                    </td>
                                    <td className="text-end">
                                        {
                                            // eslint-disable-next-line array-callback-return
                                         APIDataEcriture.map((dataEcriture) => {
                                                
                                                    // eslint-disable-next-line eqeqeq
                                                    if(dataEcriture.numeroCompte ==  compte.numero){
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.codeJournal == 'JOD'){
                                                            mouvementDebit += dataEcriture.debit;
                                                        }
                                                    }
                                                })
                                        }
                                                { mouvementDebit }
                                    </td>
                                    <td className="text-end">
                                        {
                                        // eslint-disable-next-line array-callback-return
                                         APIDataEcriture.map((dataEcriture) => {
                                            
                                            // eslint-disable-next-line eqeqeq
                                                    if(dataEcriture.numeroCompte == compte.numero){
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.codeJournal == 'JOD'){
                                                            mouvementCredit +=  dataEcriture.credit;
                                                        }
                                                    }
                                                })
                                        }
                                                { mouvementCredit }
                                    </td>
                                    <td className="text-end">
                                        {
                                        ( function getSoldeFinalDebit(){
                                                
                                                if(soldeDebutDebit-soldeDebutCredit+mouvementDebit-mouvementCredit > 0){
                                                  // eslint-disable-next-line no-unused-vars
                                                   soldeFinalDebit = soldeDebutDebit-soldeDebutCredit+mouvementDebit-mouvementCredit;
                                                   accumulateurSFD += soldeFinalDebit;
                                                   return soldeFinalDebit;
                                                }else{
                                                    return 0;
                                                };
                                                
                                            })()
                                        }
                                    </td>
                                    <td className="text-end">
                                    {
                                            (function getSoldeFinalCredit(){
                                                
                                                if(soldeDebutDebit-soldeDebutCredit+mouvementDebit-mouvementCredit < 0){
                                                // eslint-disable-next-line no-unused-vars
                                                    soldeFinalCredit = -1*(soldeDebutDebit-soldeDebutCredit+mouvementDebit-mouvementCredit);
                                                    accumulateurSFC += soldeFinalCredit;
                                                    return soldeFinalCredit;
                                                }else{
                                                    return 0;
                                                }
                                                
                                            })()
                                        }
                                    </td>
                                </tr>
                               
                        )})}
                            
                                <tr className='bg-light'>
                                    <th colSpan={3} className="text-center">Totaux</th>
                                    <th className="text-end">{ totalSoldeDebutDebit }</th>
                                    <th className="text-end">{ totalSoldeDebutCredit}</th>
                                    <th className="text-end">{ totalMouvementDebit }</th>
                                    <th className="text-end">{ totalMouvementCredit }</th>
                                    
                                    <th className="text-end">
                                       { accumulateurSFD }
                                    </th>
                                    <th className="text-end">
                                        { accumulateurSFC }
                                    </th>
                                </tr>
                            
                  </tbody>
                    ) }
            </table>
        </div>
    )
}