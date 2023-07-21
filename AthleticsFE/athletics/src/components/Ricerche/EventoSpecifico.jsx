import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAthletix from "../HomePage/NavbarAthletix";

const EventoSpecifico = () => {
  const params = useParams();
  const [evento, setEvento] = useState({});

  const fetchEvento = async () => {
    try {
      let response = await fetch(
        `http://localhost:8080/athletics/eventi/${params.id}`,
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
          },
        }
      );
      if (response.ok) {
        let dato = await response.json();
        setEvento(dato);
        console.log(evento);
      }
    } catch (error) {
      console.log("ERRORE!! " + error);
    }
  };

  useEffect(() => {
    fetchEvento();
  }, []);

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
              <div className="row d-flex justify-content-center h-100 mt-3">
                <div className="col-12 col-md-11">
                  {evento.organizzatori.name!==undefined&&(
                    <>
                    <h1>{evento.nomeEvento}</h1>
                    <h4>{evento.organizzatori.username}</h4>
                    <p>{evento.dataEvento}</p>
                    
                    </>
                  )}

                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default EventoSpecifico;
