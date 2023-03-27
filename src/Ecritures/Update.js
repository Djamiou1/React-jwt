import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Update(props) {
    const { APIData } = props;
    const [date, setDate] = useState('');
    const [libelle, setLibelle] = useState('');
    const [codeJournal, setCodeJournal] = useState('');
    const [numeroCompte, setNumeroCompte] = useState('');
    const [debit, setDebit] = useState('');
    const [credit, setCredit] = useState('');
    const [id, setID] = useState(null);

    useEffect(() => {
            setID(localStorage.getItem('ID'));
            setDate(localStorage.getItem('date'));
            setCodeJournal(localStorage.getItem('codeJournal'));
            setLibelle(localStorage.getItem('libelle'));
            setNumeroCompte(localStorage.getItem('numeroCompte'));
            setDebit(localStorage.getItem('debit'));
            setCredit(localStorage.getItem('credit'));
    }, []);
    const updateAPIData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/ecriture/${id}`, {
            date,
            libelle,
            numeroCompte,
            debit,
            credit,
            codeJournal
        })
    }
    
    return (
        <div className="container">
            <div className="row">
                <h3 className='text-center text-secondary mt-4'>Modifier l'écriture</h3>
                <div className="col-md-3"></div>
                <div className="col-md-6 p-4 pb-4  bg-secondary ">
                <form className="create-form  bg-secondary">
                        <div className='py-3 px-3 create-form border border-white'>
                            <div className='form-group mb-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <input className='form-control' type="date" placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className='form-group mb-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <select className='form-select' value={codeJournal} onChange={(e) => setCodeJournal(e.target.value)}>
                                    <option>Code journal</option>
                                    <option value='JAN'>JAN</option>
                                    <option value='JOD'>JOD</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <input className='form-control' placeholder='Libellé' type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row mt-2 pt-3 mx-0 create-form border border-white'>
                            <div className='form-group mb-4 col-md-6'>
                                <select className='form-select' value={numeroCompte} onChange={(e) => setNumeroCompte(e.target.value)}>
                                    <option>Numero de compte</option>
                                   {APIData.map((data) => {
                                   return (
                                         <option value={data.numero}>{data.numero}</option>
                                        )})}
                                </select>
                            </div>
                            <div className='form-group mb-4 col-md-3'>
                                <input className='form-control' type="number" placeholder='Débit' value={debit} onChange={(e) => setDebit(e.target.value)}/>
                            </div>
                            <div className='form-group mb-4 col-md-3'>
                                <input className='form-control' placeholder='Crédit' type="number" value={credit} onChange={(e) => setCredit(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group mt-2'>
                          <Link to='#' className="btn btn-dark mx-2 my-2" type='submit' onClick={updateAPIData}>Enrégistrer</Link>
                          <button className="btn btn-light mx-2" type='reset'>Annuler</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}