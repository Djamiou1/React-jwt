import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Update() {
    const [numero, setNumero] = useState('');
    const [libelle, setLibelle] = useState('');
    const [typeCompte, setTypeCompte] = useState('');
    const [id, setID] = useState(null);

    useEffect(() => {
            setID(localStorage.getItem('ID'));
            setNumero(localStorage.getItem('numero'));
            setLibelle(localStorage.getItem('libelle'));
            setTypeCompte(localStorage.getItem('typeCompte'))
    }, []);
    const updateAPIData = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/${id}`, {
            numero,
            libelle,
            typeCompte
        })
    }
    
    return (
        <div className="container">
            <div className="row">
                <h3 className='text-center text-secondary mt-4'>Saisie des comptes</h3>
                <div className="col-md-3"></div>
                <div className="col-md-6 p-4 pb-2  bg-secondary ">
                    <form className="">
                        <div className="p-3 create-form border border-white bg-secondary">
                          <div className='form-group mb-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                              <input className='form-control' type="number" placeholder='Numéro de compte' value={numero} onChange={(e) => setNumero(e.target.value)}/>
                          </div>
                          <div className='form-group'>
                              <input className='form-control' placeholder='Libellé' type="text" value={libelle} onChange={(e) => setLibelle(e.target.value)}/>
                          </div>
                          <label className='form-label mt-3 text-white'>Type de compte</label>
                          <div className='form-group  py-3 px-2 col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xm-4 border border-white text-white'>
                              <label><input className='form-radio' name='typeCompte[]' type="radio" onChange={(e) => setTypeCompte(e.target.value)}/> Actif</label><br/>
                              <label><input className='form-radio' name='typeCompte[]' type="radio" onChange={(e) => setTypeCompte(e.target.value)}/> Passif</label><br/>
                              <label><input className='form-radio' name='typeCompte[]' type="radio" onChange={(e) => setTypeCompte(e.target.value)}/> Produit</label><br/>
                              <label><input className='form-radio' name='typeCompte[]' type="radio" onChange={(e) => setTypeCompte(e.target.value)}/> Charge</label><br/>
                              <label><input className='form-radio' name='typeCompte[]' type="radio" onChange={(e) => setTypeCompte(e.target.value)}/> Aucun</label>
                          </div>
                          
                        </div>
                        <div className='form-group mt-1'>
                            <Link to='/Read' className="btn btn-dark mx-2 my-2"   type='submit' onClick={updateAPIData}>Enrégistrer</Link>
                            <button className="btn btn-light mx-2" type='reset'>Annuler</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
    )
}