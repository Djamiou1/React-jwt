import { useState } from "react";
import { Navigate } from 'react-router-dom';

function register() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [name, setName] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [email, setEmail] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [password, setPassword] = useState('');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [navigate, setNavigate] = useState(false);
    
    const submit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
       
      await fetch('http://localhost:8000/api/register',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name,
            email,
            password
        })
      })
     
      setNavigate(true)
    };

      if(navigate){
          return <Navigate to="/login"/>
      }
    
    return (
        <div>
             <h3 className="h3 text-center pt-4 mt-4 font-weight-normal">S'inscrire</h3>
             <form className="form-signin border border-secondary bg-secondary rounded" onSubmit={submit}>
                <input type="text" id="inputname" className="form-control" placeholder="name"
                onChange={e => setName(e.target.value)} required autoFocus/><br/>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                onChange={e => setEmail(e.target.value)} required/><br/>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                onChange={e => setPassword(e.target.value)} required/>
                <div className="checkbox mb-3">
                </div> 
                <button className="btn btn-dark form-control" type="submit">Enrégistrer</button>
            </form>
        </div>
    );
}

export default register;