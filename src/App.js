/* eslint-disable @typescript-eslint/no-redeclare */
import { useEffect, useState} from 'react';
import './css/App.css';
// eslint-disable-next-line no-unused-vars
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Plancg from './pcg/Plancg';
import Ecriture from './Ecritures/Ecriture';
import Form from './Ecritures/Form';
import Journal from './Ecritures/Journal';
import BilanOuverture from './Ecritures/BilanOuverture';
import BilanCloture from './Ecritures/BilanCloture';
import JournalUpdate from './Ecritures/Update';
import Glivre from './Ecritures/Glivre';
import Balance from './Ecritures/Balance';
import Planform from './pcg/Create';
import Read from './pcg/Read';
import Update from './pcg/Update';
import axios from 'axios';

function App() {
const [name, setName] = useState('');
const [APIData, setAPIData] = useState([]);


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

  useEffect(() => {
    axios.get(`http://localhost:8000/api/comptes`)
        .then((response) => {
            setAPIData(response.data);
        })
}, [])
  
  return (
    <Router>
        <Navbar name={name} setName={setName}/>
        <Routes>
            <Route path="/" element={<Home name={name} />} />
            <Route path="Login" element={<Login setName={setName} />} />
            <Route path="Register" element={<Register />} />

            <Route path="Plancg" element={<Plancg />} />
            <Route path="Planform" element={<Planform />} />
            <Route path="Read" element={<Read />} />
            <Route path="Update" element={<Update />} />

            <Route path="Ecriture" element={<Ecriture />} />
            <Route path="Form" element={<Form APIData={APIData} />} />
            <Route path="Journal" element={<Journal />} />
            <Route path="JournalUpdate" element={<JournalUpdate APIData={APIData} />} />
            <Route path="Glivre" element={<Glivre />} />
            <Route path="BilanOuverture" element={<BilanOuverture />} />
            <Route path="Balance" element={<Balance />} /> 
            <Route path="BilanCloture" element={<BilanCloture />} />
        </Routes>
    </Router>   
    
  );
}

export default App;
