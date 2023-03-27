import { useState } from "react";
import { Navigate } from 'react-router-dom';

function Login(props: {setName: (name: string) => void}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);
    
    const submit = async (e: { preventDefault: () => void; }) =>{
        e.preventDefault();
       
     const response = await fetch('http://localhost:8000/api/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            email,
            password
        })
      })
      

     const content = await response.json();
     setNavigate(true)
     props.setName(content.name)
    };
    
      if(navigate){
          return <Navigate to="/"/>
      }
    return (
        <div>
            <h2 className="h3 text-center mt-4 pt-4 font-weight-normal">Se connecter</h2>
            <form className="form-signin border border-secondary rounded bg-secondary" onSubmit={submit}>
                <input type="email" className="form-control" placeholder="Email address"
                  onChange={e => setEmail(e.target.value)} required autoFocus/><br/>
                <input type="password" className="form-control" placeholder="Password"
                  onChange={e => setPassword(e.target.value)} required/>
                <button className="btn btn-dark form-control mt-2" type="submit">Connexion</button>
            </form>
        </div>
    );
}

export default Login;