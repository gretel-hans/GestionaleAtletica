import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const Benvenuto=()=>{

    const navigate=useNavigate();

    const NavigateReg=()=>{
        navigate('/Registrazione')
    }
    const NavigateLog=()=>{
        navigate('/Login')
    }

    return(
        <div id="Benvenuto" className="d-flex align-items-center justify-content-center">
            <div id="BenvenutoDivOne" className="d-flex flex-column justify-content-around p-4">
            <h1 className="my-0">Benvenuto su Athletix...</h1>
            <div className="d-flex justify-content-evenly">
            <Button variant="light" onClick={NavigateReg}>Registrazione</Button>
            
            <Button variant="dark" onClick={NavigateLog}>Login</Button>
            
            </div>

            </div>

        </div>
    );
}

export default Benvenuto;