import { NavLink } from "react-router-dom";

function Ecriture(){
    return ( 
        <div className="container">
            <div className="row my-3 py-3">
                <h3 className="text-center text-secondary">Ecritures</h3>
                <div className="col-md-4"></div>
                <div className="col-md-4 p-4 bg-secondary">
                  <div className="p-4 border border-white">
                    <NavLink to='/Form' className="btn btn-dark form-control text-white">Passer les écritures</NavLink>
                    <NavLink to='/Journal' className="btn btn-dark form-control text-white mt-4">Journal</NavLink>
                    <NavLink to='/BilanOuverture' className="btn btn-dark form-control text-white mt-4">Bilan d'ouverture</NavLink>
                    <NavLink to='/Glivre' className="btn btn-dark form-control text-white mt-4">Grand Livre</NavLink>
                    <NavLink to='/Balance' className="btn btn-dark form-control text-white mt-4">Ballance</NavLink>
                    <NavLink to='#' className="btn btn-dark form-control text-white mt-4">Compte de résultat</NavLink>
                    <NavLink to='/BilanCloture' className="btn btn-dark form-control text-white mt-4">Bilan de clôture</NavLink>
                  </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
     );
}
 
export default Ecriture;