import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import RegistrazioneAtletaAllenatore from "./RegistrazioneAtletaAllenatore.jsx";
import RegistrazioneSocieta from "./RegistrazioneSocieta.jsx";

const Registrazione = () => {
  const [utenti, setUtenti] = useState([]);
  const fetchTuttiUtenti = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/utenti");
      if (response.ok) {
        let data = await response.json();
        setUtenti(data);
      }
    } catch (error) {
      console.log("ERRORE! Durante il caricamento di tutti gli utenti!");
    }
  };
  useEffect(() => {
    fetchTuttiUtenti();
  }, []);
  const [scelta, setScelta] = useState();
  const [mostraRegSocieta, setMostraRegSocieta] = useState(false);
  const [mostraRegPersona, setMostraRegPersona] = useState(false);

  let divScelta = document.getElementById("selectOpzione");

  return (
      <div>
        <section className=" gradient-custom" id="Benvenuto">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ border: "border-radius: 1rem" }}
                >
                  <div className="card-body md-p-5 text-center">
                    <div id="selectOpzione">
                      <div className="mb-5 mt-md-4 pb-0">
                        <h2 className="fw-bold mb-2 text-uppercase titoli">
                          Registrazione Athletix
                        </h2>
                        <p className="text-white-50 mb-5">
                          Che account vuoi creare ?
                        </p>

                        <Dropdown>
                          <Dropdown.Toggle
                            id="tipoDropdown"
                            className="btn-light"
                          >
                            {scelta === undefined && <>Seleziona tipo </>}
                            {scelta !== undefined && <>{scelta} </>}
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu dropdown-menu-dark text-light menuScelta">
                            <Dropdown.Item className="d-flex justify-content-center"
                             onClick={() => setScelta("Atleta")}>
                              Atleta
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex justify-content-center"
                              onClick={() => setScelta("Allenatore")}
                            >
                              Allenatore
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex justify-content-center"
                              onClick={() => setScelta("Atleta e allenatore")}
                            >
                              Atleta e allenatore
                            </Dropdown.Item>
                            <Dropdown.Item className="d-flex justify-content-center"
                             onClick={() => setScelta("Societa")}>
                              Società
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>

                        <button
                          className="btn btn-outline-light btn-lg px-5 mt-4 "
                          onClick={() => {
                            if (
                              scelta === "Atleta" ||
                              scelta === "Allenatore" ||
                              scelta === "Atleta e allenatore"
                            ) {
                              setMostraRegPersona(true);
                              divScelta.style.display = "none";
                            } else if (scelta === "Societa") {
                              setMostraRegSocieta(true);
                              divScelta.style.display = "none";
                            }
                          }}
                        >
                          Procedi
                        </button>
                      </div>
                      <div>
                        <p className="mb-0">
                          Sei già registrato? <Link to="/Login">Accedi!</Link>
                        </p>
                      </div>
                    </div>
                    {mostraRegSocieta && (
                      <>
                        <RegistrazioneSocieta listaUtenti={utenti} />
                      </>
                    )}
                    {mostraRegPersona && (
                      <>
                        <RegistrazioneAtletaAllenatore
                          listaUtenti={utenti}
                          tipo={scelta}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div>
  );
};

export default Registrazione;
