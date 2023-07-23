import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

const RegistrazioneAtletaAllenatore = (props) => {
  const generi = [
    { value: "Femmina", label: "Donna" },
    { value: "Maschio", label: "Uomo" },
  ];
  const [mostraPass, setMostraPass] = useState(true);
  const [datiRegistrazione, setDatiRegistrazione] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    roles: "",
    genere: "",
    birthdate: "",
    societa: undefined,
  });
  const [societa, setSocieta] = useState([]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
  };

  const fetchTutteSocieta = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/societa");
      let tutteSocieta = await response.json();

      const opzioneSocieta = tutteSocieta.map((societa) => ({
        value: societa,
        label: `${societa.name}`,
      }));
      setSocieta(opzioneSocieta);
      if (props.tipo === "Allenatore") {
        setDatiRegistrazione({ ...datiRegistrazione, roles: ["ALLENATORE"] });
      } else if (props.tipo === "Atleta") {
        setDatiRegistrazione({ ...datiRegistrazione, roles: ["ATLETA"] });
      } else if (props.tipo === "Atleta e allenatore") {
        setDatiRegistrazione({
          ...datiRegistrazione,
          roles: ["ATLETA", "ALLENATORE"],
        });
      }
    } catch (error) {
      console.log("ERRORE!! durante il caricamento di tutte le società!!");
    }
  };

  useEffect(() => {
    fetchTutteSocieta();
  }, []);

  const fetchRegister = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiRegistrazione),
      });
      if (response.ok) {
        alert(
          `${datiRegistrazione.name} il tuo profilo è stato registrato con successo!`
        );
        let responseLogin = await fetch(
          "http://localhost:8080/athletics/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: datiRegistrazione.username,
              password: datiRegistrazione.password,
            }),
          }
        );
        if (responseLogin.ok) {
          let token = await responseLogin.json();
          sessionStorage.setItem("bearerToken", token.accessToken);
          sessionStorage.setItem("username", token.username);
          window.location.replace("/Homepage");
        }
      }
    } catch (error) {
      console.log("ERRORE!! Durante la registrazione " + error);
    }
  };

  return (
    <div>
      <div
        className="card bg-dark text-white Contenitore"
        style={{ border: "border-radius: 6rem" }}
      >
        <div className="card-body md-p-5 text-center">
          <div className="mb-md-5 mt-md-4 pb-0">
            <h1 className="mb-1">ATHLETIX</h1>
            <h2 className="fw-bold mb-3 text-uppercase">
              Register {props.tipo}
            </h2>
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
                      className="form-control form-control-lg inputS"
                      placeholder="Nome...."
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
                      type="text"
                      className="form-control form-control-lg inputS"
                      placeholder="Cognome...."
                      value={datiRegistrazione.lastname}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          lastname: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col className="mb-3 mb-md-0 opzioneSelect">
                  <Select
                    placeholder="Seleziona genere..."
                    options={generi}
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
                    onChange={(e) => {
                      setDatiRegistrazione({
                        ...datiRegistrazione,
                        genere: e.value,
                      });
                    }}
                  />
                </Col>

                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="date"
                      className="form-control form-control-lg"
                      value={datiRegistrazione.birthdate}
                      onChange={(e) => {
                        setDatiRegistrazione({
                          ...datiRegistrazione,
                          birthdate: e.target.value,
                        });
                      }}
                    />
                  </div>
                </Col>
                <Col className="mb-3 mb-md-0">
                  <Select
                    placeholder="Seleziona società..."
                    options={societa}
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
                    onChange={(e) => {
                      setDatiRegistrazione({
                        ...datiRegistrazione,
                        societa: e.value,
                      });
                    }}
                  />
                </Col>
                <Col>
                  {" "}
                  <div className="form-outline form-white mb-4">
                    <input
                      type="text"
                      className="form-control form-control-lg inputS"
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
                      className="form-control form-control-lg inputS"
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
                      className="form-control form-control-lg small-text mb-2 inputS"
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
                  </div>
                </Col>
              </Row>
            </Container>

            <button
              className="btn btn-outline-light btn-lg px-5 mt-4"
              onClick={() => {
                let c = 0;
                props.listaUtenti.forEach((utente) => {
                  if (
                    datiRegistrazione.email === utente.email ||
                    datiRegistrazione.username === utente.username
                  ) {
                    c++;
                  }
                });
                if (c === 0) {
                  if (
                    datiRegistrazione.email.length > 5 &&
                    datiRegistrazione.name.length !== 0 &&
                    datiRegistrazione.username.length !== 0 &&
                    datiRegistrazione.password.length !== 0 &&
                    datiRegistrazione.birthdate.length !== 0 &&
                    datiRegistrazione.societa !== undefined
                  ) {
                    fetchRegister();
                  } else {
                    alert("Riempi tutti i campi!");
                  }
                } else {
                  alert("Username e/o email già esistenti!");
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

export default RegistrazioneAtletaAllenatore;
