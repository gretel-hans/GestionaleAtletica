import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import RegistrazioneAtletaAllenatore from "./RegistrazioneAtletaAllenatore.jsx";
import RegistrazioneSocieta from "./RegistrazioneSocieta.jsx";

const Registrazione = () => {
  /*
const fetchTuttiUtenti= async()=>{
  let response=await fetch("http://localhost:8080/athletics/utenti");
  let data=await response.json();
  setUtenti(data);
  
}*/

  const [scelta, setScelta] = useState();
  const [mostraRegs, setMostraRegs] = useState(false);

  let divScelta=document.getElementById("sceltaOpzione")

  const cambiaScelta = (e) => {
    setScelta(e.target.value);
  };
  return (
    <div>
      <div>
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ border: "border-radius: 1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div id="selectOpzione">

                    
                    <div className="mb-md-5 mt-md-4 pb-0">
                      <h2 className="fw-bold mb-2 text-uppercase">
                        Registrazione Athletix
                      </h2>
                      <p className="text-white-50 mb-5">
                        Che account vuoi creare ?
                      </p>

                      <select
                        className="form-select mx-0-auto"
                        id="sceltaP"
                        value={scelta}
                        onChange={cambiaScelta}
                      >
                        <option>Seleziona tipo</option>
                        <option value="atleta">Atleta</option>
                        <option value="allenatore">Allenatore</option>
                        <option value="allenatoreAtleta">
                          Allenatore e Atleta{" "}
                        </option>
                        <option value="societa">Società</option>
                      </select>

                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-4 "
                        onClick={() => {
                          if (
                            scelta === "atleta" ||
                            scelta === "allenatore" ||
                            scelta === "allenatoreAtleta"
                          ) {
                            window.location.replace("/Registrazione/p");
                          } else if (scelta === "societa") {
                            setMostraRegs(true);
                          }
                          console.log(scelta);
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
                    {mostraRegs && (
                      <>
                        <RegistrazioneSocieta />
                        <h1>Ciaoo</h1>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Registrazione;
