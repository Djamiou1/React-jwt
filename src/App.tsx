import { useEffect, useState} from 'react';
import './css/App.css';
// eslint-disable-next-line no-unused-vars
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
const [name, setName] = useState('');

  useEffect( () => {
       (
        async () => {
           const response = await fetch('http://localhost:8000/api/user',{
                            headers: {'Content-Type': 'application/json'},
                            credentials: 'include',
         });
         
         const content = await response.json();
         setName(content.name);

     })();
  });
  
  return (
    <Router>
        <Navbar name={name} setName={setName}/>
        <Routes>
            <Route path="/" element={<Home name={name} />} />
            <Route path="Login" element={<Login setName={setName} />} />
            <Route path="Register" element={<Register />} />
        </Routes>
    </Router>   
    
  );
}

export default App;
