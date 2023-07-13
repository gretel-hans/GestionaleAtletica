import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CreazioneEventi = () => {
  const [formCorse, setFormCorse] = useState(false);
  const [formConcorsi, setFormConcorsi] = useState(false);
  let gareCorse = [
    { label: "60m", value: "Velocita_60m" },
    { label: "80m", value: "Velocita_80m" },
    { label: "100m", value: "Velocita_100m" },
    { label: "150m", value: "Velocita_150m" },
    { label: "200m", value: "Velocita_200m" },
    { label: "300m", value: "Velocita_100m" },
    { label: "400m", value: "Velocita_400m" },
    { label: "4x100m", value: "Staffetta_4x100" },
    { label: "4x200m", value: "Staffetta_4x200" },
    { label: "4x400m", value: "Staffetta_4x400" },
    { label: "3x800m", value: "Staffetta_3x800" },
    { label: "3x1000m", value: "Staffetta_3x1000" },
    { label: "100hs", value: "Ostacoli_100hs" },
    { label: "110hs", value: "Ostacoli_110hs" },
    { label: "400hs", value: "Ostacoli_400hs" },
    { label: "800m", value: "MezzoFondo_800m" },
    { label: "1000m", value: "MezzoFondo_1000m" },
    { label: "1500m", value: "MezzoFondo_1500m" },
    { label: "2000m", value: "MezzoFondo_2000m" },
    { label: "3000m", value: "MezzoFondo_3000m" },
    { label: "4000m", value: "MezzoFondo_4000m" },
    { label: "5000m", value: "MezzoFondo_5000m" },
    { label: "10000m", value: "MezzoFondo_10000m" },
  ];
  let gareConcorsi = [
    { label: "Salto in Lungo", value: "Salto_lungo" },
    { label: "Salto in Alto", value: "Salto_alto" },
    { label: "Salto Triplo", value: "Salto_triplo" },
    { label: "Salto con l'Asta", value: "Salto_asta" },
    { label: "Lancio del Peso", value: "Lancio_peso" },
    { label: "Lancio del Vortex", value: "Lancio_vortex" },
    { label: "Lancio del Disco", value: "Lancio_disco" },
    { label: "Lancio del Martello", value: "Lancio_martello" },
    { label: "Lancio del Giavellotto", value: "Lancio_giavellotto" },
  ];
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: "black",
      color: "white",
    }),
  };

  const [evento, setEvento] = useState({
    codice: sessionStorage.getItem("bearerToken"),
    nomeEvento: "",
    dataEvento: "",
    listaCorse: [],
    listaGareConcorsi: [],
  });

  return (
    <>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && (
        <div>
          Non sei loggato per accedere ai contenuti esegui il login o
          registrati!
        </div>
      )}

      {(sessionStorage.getItem("username") !== null ||
        sessionStorage.getItem("username") !== "null") && (
        <div>
          <NavbarAthletix />
          <section className="vh-100 gradient-custom">
            <div className="container h-100">
              <div className="row d-flex justify-content-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                  <h1 className="mt-2">Benvenuto nella creazione di Eventi!</h1>
                  <div
                    className="card bg-dark text-white"
                    style={{ border: "border-radius: 6rem" }}
                  >
                    <div className="card-body md-p-5 text-center">
                      <div className="mb-md-5 mt-md-4 pb-0">
                        <p className="text-white-50 mb-5">
                          Inserisci i dati dell'evento che vuoi creare
                        </p>
                        <Container fluid>
                          <Row className="row-cols-1 row-cols-md-2 justify-content-center">
                            <Col>
                              {" "}
                              <div className="form-outline form-white mb-4">
                                <input
                                  type="text"
                                  id="nomeEventi"
                                  className="form-control form-control-lg"
                                  placeholder="Nome evento...."
                                  value={evento.nomeEvento}
                                  onChange={(e) => {
                                    setEvento({
                                      ...evento,
                                      nomeEvento: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                            </Col>

                            <Col>
                              {" "}
                              <div className="form-outline form-white mb-4">
                                <input
                                  type="date"
                                  id="civico"
                                  className="form-control form-control-lg"
                                  value={evento.dataEvento}
                                  onChange={(e) => {
                                    setEvento({
                                      ...evento,
                                      dataEvento: e.target.value,
                                    });
                                    //console.log(e.value)
                                  }}
                                />
                              </div>
                            </Col>
                            <Col>
                              <button
                                className="btn btn-outline-light"
                                onClick={() => {
                                  setFormCorse(true);
                                  setFormConcorsi(false);
                                }}
                              >
                                Gestione lista Gare di Corsa
                              </button>
                            </Col>
                            <Col>
                              <button
                                className="btn btn-outline-light"
                                onClick={() => {
                                  setFormConcorsi(true);
                                  setFormCorse(false);
                                }}
                              >
                                Gestione lista Gare Concorsi
                              </button>
                            </Col>
                          </Row>
                        </Container>

                        {formConcorsi && (
                          <Container fluid>
                            <Row className="row-cols-1 justify-content-center">
                              <Col>
                                <Select
                                  isMulti
                                  name="concorsi"
                                  options={gareConcorsi}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
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
                                />
                              </Col>
                            </Row>
                          </Container>
                        )}
                        {formCorse && (
                          <Container fluid>
                            <Row className="row-cols-1 justify-content-center">
                              <Col>
                                <Select
                                  isMulti
                                  name="corse"
                                  options={gareCorse}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                />
                              </Col>
                            </Row>
                          </Container>
                        )}

                        <button className="btn btn-outline-light btn-lg px-5 mt-4">
                          Crea Evento
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default CreazioneEventi;
