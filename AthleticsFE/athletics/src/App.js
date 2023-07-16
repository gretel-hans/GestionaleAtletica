
import './App.css';
import './css/Login.css';
import './css/Registrazione.css';
import Benvenuto from './components/RegistrazioneLogin/Benvenuto';
import Registrazione from './components/RegistrazioneLogin/Registrazione';
import Login from './components/RegistrazioneLogin/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './components/HomePage/Homapage';
import CreazioneEventi from './components/Societa/CreazioneEventi';
import IscrizioniGare from './components/Allenatore/IscrizioniGare';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Benvenuto/>}/>
        <Route path="/Registrazione" element={<Registrazione/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Homepage" element={<Homepage/>}/>
        <Route path="/creaEvento" element={<CreazioneEventi/>}/>
        <Route path="/IscrizioniGare" element={<IscrizioniGare/>}/>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
