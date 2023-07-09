import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useState } from "react";

const Registrazione = () => {
  /*
const fetchTuttiUtenti= async()=>{
  let response=await fetch("http://localhost:8080/athletics/utenti");
  let data=await response.json();
  setUtenti(data);
  
}*/
  let atleta = document.getElementById("atleta");
  let allenatoreAtleta = document.getElementById("AllenatoreAtleta");
  let societa = document.getElementById("societa");
  const [scelta,setScelta]=useState();

  const cambiaScelta=(e)=>{
setScelta(e.target.value);
  }
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
                    <div className="mb-md-5 mt-md-4 pb-0">
                      <h2 className="fw-bold mb-2 text-uppercase">
                        Registrazione Athletix
                      </h2>
                      <p className="text-white-50 mb-5">
                        Che account vuoi creare ?
                      </p>

                      <select
                        className="form-select"
                        id="scelta"
                        value={scelta}
                        onChange={cambiaScelta}
                      >
                        <option value="atleta">Atleta</option>
                        <option value="allenatore">Allenatore</option>
                        <option value="allenatoreAtleta">Allenatore e Atleta </option>
                        <option value="societa">Società</option>
                      </select>

                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-4 mb-5"
                        onClick={() => {
                            
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
