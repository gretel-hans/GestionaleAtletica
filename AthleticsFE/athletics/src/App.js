
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
import RegistrazioneAtletaAllenatore from './components/RegistrazioneLogin/RegistrazioneAtletaAllenatore.jsx';
import RegistrazioneSocieta from './components/RegistrazioneLogin/RegistrazioneSocieta';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Benvenuto/>}></Route>
        <Route path="/Registrazione" element={<Registrazione/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/Homepage" element={<Homepage/>}></Route>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
