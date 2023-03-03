import React from 'react';
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
            <form className="form-signin" onSubmit={submit}>
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address"
                  onChange={e => setEmail(e.target.value)} required autoFocus/><br/>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                  onChange={e => setPassword(e.target.value)} required/>
                <div className="checkbox mb-3">
                </div> 
                <button className="btn btn-primary form-control" type="submit">Sign in</button>
            </form>
        </div>
    );
}

export default Login;