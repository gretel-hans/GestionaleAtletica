import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Select from "react-select";

const RegistrazioneSocieta = (props) => {
  const [mostraPass, setMostraPass] = useState(true);
  const [datiRegistrazione, setDatiRegistrazione] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    roles: ["SOCIETA"],
    indirizzo: {
      nomeVia: "",
      civico: "",
      comune: null,
    },
  });
  const [comuni, setComuni] = useState([]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
  };

  const fetchTuttiComuni = async () => {
    let response = await fetch(
      "http://localhost:8080/athletics/indirizzi/comuni"
    );
    let tuttiComuni = await response.json();

    const opzioneComune = tuttiComuni.map((comune) => ({
      value: comune,
      label: `${comune.nomeComune}`,
    }));
    setComuni(opzioneComune);
  };

  useEffect(() => {
    fetchTuttiComuni();
  }, []);

  const fetchRegister = async() => {
    try {
      let response= await fetch("http://localhost:8080/athletics/register",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(datiRegistrazione)
      });
      if(response.ok){
        alert("La tua società è stata registrata con successo! ")
      }
      
    } catch (error) {
      console.log("ERRORE!! "+error);
    }
     
  };

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
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="nomeSocieta"
                      className="form-control form-control-lg"
                      placeholder="Nome società...."
                      value={datiRegistrazione.name}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          name: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="indirizzo"
                      className="form-control form-control-lg"
                      placeholder="Indirizzo...."
                      value={datiRegistrazione.indirizzo.nomeVia}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          indirizzo: {
                            ...datiRegistrazione.indirizzo,
                            nomeVia: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      id="civico"
                      className="form-control form-control-lg"
                      placeholder="Civico...."
                      value={datiRegistrazione.indirizzo.civico}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          indirizzo: {
                            ...datiRegistrazione.indirizzo,
                            civico: e.target.value,
                          },
                        });
                        //console.log(e.value)
                      }}
                    />
                  </div>
                </Col>
                <Col className="mb-3 mb-md-0">
                  <Select
                  placeholder="Seleziona comune..."
                    options={comuni}
                    styles={customStyles}
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 0,
                      colors: {
                        ...theme.colors,
                        primary25: "hotpink",
                        primary: "black",
                      },
                    })}
                    //value={datiRegistrazione.indirizzo.comune}
                    onChange={(e) => {
                      setDatiRegistrazione({
                        ...datiRegistrazione,
                        indirizzo: {
                          ...datiRegistrazione.indirizzo,
                          comune: e.value,
                        },
                      });
                    }}
                  />
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Username...."
                      value={datiRegistrazione.username}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          username: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Email...."
                      value={datiRegistrazione.email}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                    required
                      type={mostraPass ? "password" : "text"}
                      id="password"
                      className="form-control form-control-lg small-text mb-2"
                      placeholder="Password..."
                      value={datiRegistrazione.password}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          password: e.target.value,
                        });
                      }}
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
              onClick={()=>{
                let c=0;
                props.listaUtenti.forEach(utente => {
                  if(datiRegistrazione.email===utente.email || datiRegistrazione.username===utente.username){
                    c++;
                  }
                });
                if(c==0){
                  if (datiRegistrazione.email.length>5&&datiRegistrazione.name.length!==0&&datiRegistrazione.username.length!==0&&datiRegistrazione.password.length!==0&&datiRegistrazione.indirizzo.nomeVia.length!==0&&datiRegistrazione.indirizzo.civico.length!==0&&datiRegistrazione.indirizzo.comune!==null){
                    console.log("passato")
                    fetchRegister()
                  }else{
                    alert("Riempi tutti i campi!")
                  }
                }else{
                  alert("Username e/o email già esistenti!")
                }
              }}
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
