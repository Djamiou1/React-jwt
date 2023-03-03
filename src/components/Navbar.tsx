import React from 'react';
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
        <div className="px-1 header">
          <nav className="navbar navbar-expand-lg b-bottom shadow-sm">
              <div className="container-fluid">
                <NavLink to='#' className="navbar-brand text-light">YD</NavLink>
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
                        <NavLink to="/Login" className="text-dark">Login</NavLink>
                      </div>
                      <div className="form mx-2 nav-item text-dark" role="search">
                        <NavLink to="/Register" className="text-dark">Register</NavLink>
                      </div>
                  </div>
                       :
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                          
                      </li>
                      </ul>
                      <div className="form mx-2 nav-item text-dark" role="search">
                        <NavLink to="/Login" className="text-dark" onClick={logout}>Logout</NavLink>
                      </div>
                  </div>

              }
              </div>
          </nav>
          <div className="text-center">
              <h3 className="py-4">Bienvenue</h3>
          </div>
      </div>
      <Outlet />
    </div>
    );
}

export default Navbar;