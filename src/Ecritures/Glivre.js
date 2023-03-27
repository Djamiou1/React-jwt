import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Load } from '../styles/Load';

export default function Glivre() {
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
    
    //    récupérations des écritures
    const [APIDataEcriture, setAPIDataEcriture] = useState([]);
    useEffect(() => {
        setDataLoading(true)
        axios.get(`http://localhost:8000/api/ecritures`)
            .then((ecriture) => {
                setAPIDataEcriture(ecriture.data);
                setDataLoading(false)
            })
    }, [])

    // Totaux soldes debuts et mouvements
    let totalSoldeDebutDebit = 0;
    let totalSoldeDebutCredit = 0;
      
    return (
        <div style={{ marginTop: 20 }} className="container">
            <Link className="btn btn-dark " to="/Ecriture">Rétour</Link>
            <h3 className='text-secondary px-3 my-3'>Grand livre des comptes</h3>
                {isDataLoading ? (
                   
                             <div className='mt-3 mx-4'>
                                Chargement...<Load className='mx-4'/>
                             </div>
                           
                    ) : (
                    <div className='container-fluid'>
                        <div className='row'>
                        {APIData.map((data) => {

                            let soldeDebutDebit = 0;
                            let soldeDebutCredit = 0;
                            let mouvementDebit = 0;
                            let mouvementCredit = 0;

                            return (
                             <div className='col-md-3'>
                               <table className='table table-bordered'>
                                 <thead>
                                    <tr className='bg-light'>
                                        <th colSpan={2} className='text-center'>{data.numero}-{data.libelle}</th>
                                    </tr>
                                    <tr>
                                        <td className='text-end'>
                                            {
                                            // eslint-disable-next-line array-callback-return
                                            APIDataEcriture.map((dataEcriture) => {
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.codeJournal == 'JAN'){
                                                            // eslint-disable-next-line eqeqeq
                                                            if(dataEcriture.numeroCompte == data.numero){
                                                                soldeDebutDebit += dataEcriture.debit;
                                                            }
                                                        }
                                                    })
                                            }
                                            { soldeDebutDebit }
                                        </td>
                                        <td className='text-end'>
                                            {
                                            // eslint-disable-next-line array-callback-return
                                            APIDataEcriture.map((dataEcriture) => {
                                                       
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.codeJournal == 'JAN'){
                                                            // eslint-disable-next-line eqeqeq
                                                            if(dataEcriture.numeroCompte == data.numero){
                                                                soldeDebutCredit += dataEcriture.credit;
                                                            }
                                                        }
                                                    })
                                            }
                                            { soldeDebutCredit }
                                        </td>
                                    </tr>
                                    <tr>
                                    <td className='text-end'>
                                            {
                                            // eslint-disable-next-line array-callback-return
                                            APIDataEcriture.map((dataEcriture) => {
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.codeJournal == 'JOD'){
                                                            // eslint-disable-next-line eqeqeq
                                                            if(dataEcriture.numeroCompte == data.numero){
                                                                mouvementDebit += dataEcriture.debit;
                                                            }
                                                        }
                                                    })
                                            }
                                            { mouvementDebit }
                                        </td>
                                        <td className='text-end'>
                                            {
                                            // eslint-disable-next-line array-callback-return
                                            APIDataEcriture.map((dataEcriture) => {
                                                        // eslint-disable-next-line eqeqeq
                                                        if(dataEcriture.codeJournal == 'JOD'){
                                                            // eslint-disable-next-line eqeqeq
                                                            if(dataEcriture.numeroCompte == data.numero){
                                                                mouvementCredit += dataEcriture.credit;
                                                            }
                                                        }
                                                    })
                                            }
                                            { mouvementCredit }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className='text-end'>
                                            {
                                             (function getSoldeFinalDebit(){

                                                       totalSoldeDebutDebit = soldeDebutDebit+mouvementDebit;
                                                       totalSoldeDebutCredit = soldeDebutCredit+mouvementCredit;

                                                        if(totalSoldeDebutDebit-totalSoldeDebutCredit > 0){
                                                        // eslint-disable-next-line no-unused-vars
                                                        return '';
                                                        }else{
                                                            return -1*(totalSoldeDebutDebit-totalSoldeDebutCredit);
                                                        }
                                                    })()
                                            }
                                        </td>
                                        <td className='text-end'>
                                        {
                                            (function getSoldeFinalDebit(){
                                                
                                                      totalSoldeDebutDebit = soldeDebutDebit+mouvementDebit;
                                                       totalSoldeDebutCredit = soldeDebutCredit+mouvementCredit;

                                                        if(totalSoldeDebutDebit-totalSoldeDebutCredit > 0){
                                                        // eslint-disable-next-line no-unused-vars
                                                        return totalSoldeDebutDebit-totalSoldeDebutCredit;
                                                        }else{
                                                            return '';
                                                        }
                                                    })()
                                            }
                                        </td>
                                    </tr>
                                    <tr className='bg-light'>
                                        <th className='text-end'>
                                        {
                                                (function getTotal(){
                                                
                                                    if(totalSoldeDebutDebit-totalSoldeDebutCredit > 0){
                                                    // eslint-disable-next-line no-unused-vars
                                                        return totalSoldeDebutDebit;
                                                    }else{
                                                        return totalSoldeDebutCredit;
                                                    }
                                                    
                                                })()
                                            }
                                        </th>
                                        <th className='text-end'>
                                        {
                                                (function getTotal(){
                                                
                                                    if(totalSoldeDebutDebit-totalSoldeDebutCredit > 0){
                                                    // eslint-disable-next-line no-unused-vars
                                                        return totalSoldeDebutDebit;
                                                    }else{
                                                        return totalSoldeDebutCredit;
                                                    }
                                                    
                                                })()
                                        }
                                        </th>
                                    </tr>
                                 </thead>
                               </table>
                             </div>
                        )})}
                        </div>
                    </div>
                    )}
           
        </div>
    )
}