import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RegistrazioneSocieta = () => {
  const [mostraPass, setMostraPass] = useState(true);
  const [datiRegistrazione, setDatiRegistrazione] = useState({});

const fetchTuttiComuni= async()=>{
    let response =fetch('http://localhost:8080/athletics/indirizzi/comuni')
    let tuttiComuni= await (await response).json();
}

  useEffect(()=>{
    fetchTuttiComuni();
  },[])
  const fetchRegister = () => {};

  return (
    <div>
      <div
        className="card bg-dark text-white"
        style={{ border: "border-radius: 6rem" }}
      >
        <div className="card-body md-p-5 text-center">
          <div className="mb-md-5 mt-md-4 pb-0">
            <h1 className="mb-1">ATHLETIX</h1>
            <h2 className="fw-bold mb-3 text-uppercase">Register Società</h2>
            <p className="text-white-50 mb-5">
              Inserisci i tuoi dati per registrarti
            </p>
            <Container fluid>
              <Row className="row-cols-1 row-cols-md-2 justify-content-center">
              <Col >
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="nomeSocieta"
                      className="form-control form-control-lg"
                      placeholder="Nome società...."
                    />
                  </div>
                </Col>
                <Col >
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="indirizzoCivico"
                      className="form-control form-control-lg"
                      placeholder="Indirizzo e civico...."
                    />
                  </div>
                </Col>
                <Col >
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Username...."
                    />
                  </div>
                </Col>
                <Col >
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Email...."
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type={mostraPass ? "password" : "text"}
                      id="password"
                      className="form-control form-control-lg small-text mb-2"
                      placeholder="Password..."
                    />
                    <i
                      className="bi bi-eye mt-3 mostraPass"
                      onClick={() => setMostraPass(!mostraPass)}
                    ></i>
                    <p id="scrittaErratiDatiLogin">
                      Username e/o password errati!
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>

            <button
              className="btn btn-outline-light btn-lg px-5 mt-4"
              onClick={fetchRegister}
            >
              Registrati
            </button>

            <div className="d-flex justify-content-center text-center mt-4 pt-1">
              <a href="#!" className="text-white">
                <i className="fab fa-facebook-f fa-lg"></i>
              </a>
              <a href="#!" className="text-white">
                <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
              </a>
              <a href="#!" className="text-white">
                <i className="fab fa-google fa-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <p className="mb-0">
              Hai già un account? <Link to="/Login">Accedi!</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrazioneSocieta;
