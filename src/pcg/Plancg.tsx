import { NavLink } from "react-router-dom";

 
function Plancg(){
    return ( 
        <div className="container">
            <div className="row my-3 py-3">
                <h3 className="text-center text-secondary">Plan comptable</h3>
                <div className="col-md-4"></div>
                <div className="col-md-4 bg-secondary">
                  <div className="m-4 p-4 border border-white">
                    <NavLink to='/Planform' className="btn btn-dark form-control text-white">Saisie des comptes</NavLink>
                    <NavLink to='/Read' className="btn btn-dark form-control text-white mt-3">Liste des comptes</NavLink>
                  </div>
                </div>
                <div className="col-md-4"></div>
            </div>
        </div>
     );
}
 
export default Plancg;