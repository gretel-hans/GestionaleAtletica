import  Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Benvenuto = () => {
  const navigate = useNavigate();

  const NavigateReg = () => {
    navigate("/Registrazione");
  };
  const NavigateLog = () => {
    navigate("/Login");
  };

  return (
    <div
      id="Benvenuto"
      className="d-flex align-items-center justify-content-center"
    >
      <div
        id="BenvenutoDivOne"
        className="d-flex flex-column justify-content-around p-4 sfondoErrore"
      >
        <h1 className="my-0"><i>Benvenuto su <b>ATHLETIX...</b></i></h1>
        <div className="d-flex justify-content-evenly">
          <Button variant="light" className="btn-lg btn-outline-dark" onClick={NavigateReg}>
            Registrazione
          </Button>

          <Button variant="dark" className="btn-lg btn-outline-light" onClick={NavigateLog}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Benvenuto;
