import { NavLink,  Outlet } from 'react-router-dom';


function Navbar(props: {name : any, setName: (name: string) => void}) {
 
  const logout = async () => {
    await fetch('http://localhost:8000/api/logout',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
   });
   props.setName('');
 };

    return (
      <div>
        <div className="header bg-white">
          <nav className="navbar navbar-expand-lg b-bottom shadow-sm">
              <div className="container-fluid">
                <NavLink to='/' className="navbar-brand text-white bg-secondary p-2 border rounded text-bolder">GESTION COMPTABLE</NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  MENU
              </button>
              {props.name === '' ? 
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          
                      </li>
                      </ul>
                      
                      <div className="form mx-2 nav-item text-dark" role="search">
                        <NavLink to="/Login" className="text-dark">Se connecter</NavLink>
                      </div>
                      <div className="form mx-2 nav-item text-lg text-dark" role="search">
                        <NavLink to="/Register" className="text-dark">S'inscrire</NavLink>
                      </div>
                  </div>
                       :
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        <NavLink to='/Plancg' id='lien' className={({isActive}) => (isActive ? "activeLink" : undefined)}>Plan comptable</NavLink><br/>
                      </li>
                      <li className="nav-item">
                        <NavLink to='/Ecriture' id='lien' className={({isActive}) => (isActive ? "activeLink" : undefined)}>Ecritures</NavLink><br/>
                      </li>
                      </ul>
                      <div className="form mx-2 nav-item text-lg text-dark" role="search">
                        <NavLink to="/Login" className="text-dark mx-3" onClick={logout}>Logout</NavLink>
                      </div>
                  </div>

              }
              </div>
          </nav>
      </div>
      <Outlet />
    </div>
    );
}

export default Navbar;