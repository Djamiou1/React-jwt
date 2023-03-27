// import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
 
function Form(props: { APIData: any; }){

    const [date, setDate] = useState('');
    const [libelle, setLibelle] = useState('');
    const [codeJournal, setCodeJournal] = useState('');
    const [numeroCompte, setNumeroCompte] = useState('');
    const [debit, setDebit] = useState('');
    const [credit, setCredit] = useState('');

    const { APIData } = props;
    // const [etat0, setEtat0] = useState([]);

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/etat0`)
    //         .then((response) => {
    //             setEtat0(response.data);
    //         })
    // }, [etat0])
   //store ecritures
    const submit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
       
      await fetch('http://localhost:8000/api/ecriture',{
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            date,
            libelle,
            numeroCompte,
            debit,
            credit,
            codeJournal
          })
        })
      }

    return ( 
        <div className="container">
            <Link to='/Ecriture' className='btn btn-dark mt-4'>Rétour</Link>
            <div className="row">
                <h3 className='text-center text-secondary '>Saisie des écritures</h3>
                <div className="col-md-3"></div>
                <div className="col-md-6 py-4">
                    <form className="py-3 px-3 create-form border border-white bg-secondary" onSubmit={submit}>
                        <div className='py-3 px-3 create-form border border-white'>
                            <div className='form-group mb-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <input className='form-control' type="date" placeholder='Date' onChange={(e) => setDate(e.target.value)}/>
                            </div>
                            <div className='form-group mb-4 col-xl-6 col-lg-6 col-md-6 col-sm-6 col-xs-6'>
                                <select className='form-select' name="codejournal" id="" onChange={(e) => setCodeJournal(e.target.value)}>
                                    <option>Code journal</option>
                                    <option value='JAN'>JAN</option>
                                    <option value='JOD'>JOD</option>
                                </select>
                            </div>
                            <div className='form-group'>
                                <input className='form-control' placeholder='Libellé' type="text" onChange={(e) => setLibelle(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row mt-2 pt-3 mx-0 create-form border border-white'>
                            <div className='form-group mb-4 col-md-6'>
                                <select className='form-select' name="numero" id="" onChange={(e) => setNumeroCompte(e.target.value)}>
                                    <option>Numero de compte</option>
                                   {APIData.map((data: any) => {
                                   return (
                                         <option value={data.numero}>{data.numero}</option>
                                        )})}
                                </select>
                            </div>
                            <div className='form-group mb-4 col-md-3'>
                                <input className='form-control' type="number" placeholder='Débit' onChange={(e: {target: any; preventDefault: () => void; }) => setDebit(e.target.value)}/>
                            </div>
                            <div className='form-group mb-4 col-md-3'>
                                <input className='form-control' placeholder='Crédit' type="number" onChange={(e: {target: any; preventDefault: () => void; }) => setCredit(e.target.value)}/>
                            </div>
                        </div>
                        <div className='form-group mt-2'>
                          <button className="btn btn-dark mx-2 my-2" type='submit'>Enrégistrer</button>
                          {/* <button className="btn btn-dark mx-2 my-2">Equilibrer</button> */}
                          <button className="btn btn-light mx-2" type='reset'>Annuler</button>
                        </div>
                        <div>
                        {/* <table className="table table-striped">
                            <tbody>
                            {etat0.map((etat: any) => {
                                console.log(etat.numeroCompte)
                                return(
                                <tr className=' bg-light'>
                                    <td>{ etat.numeroCompte }</td>
                                    <td>{ etat.libelle }</td>
                                    <td>{ etat.debit }</td>
                                    <td>{ etat.credit }</td>
                                </tr>
                                )})}
                            </tbody>
                        </table> */}
                   </div>
                    </form>
                    
                </div>
                <div className="col-md-3"></div>
            </div>
        </div>
     );
}
 
export default Form;