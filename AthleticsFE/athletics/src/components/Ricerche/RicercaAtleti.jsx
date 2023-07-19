import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Card from "react-bootstrap/Card";

const RicercaAtleti = () => {
  let utenteAtleta = [];
  let [atleti, setAtleti] = useState([{}]);
  let risultatoAtleti = [];
  let [inputBarra, setInputBarra] = useState("");

  const fetchAtleti = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/utenti");
      if (response.ok) {
        let data = await response.json();

        data.forEach((utente, indexUtente) => {
          let ruoli = [...utente.roles];
          ruoli.forEach((ruolo, index) => {
            if (ruolo.roleName === "ROLE_ATLETA") {
              utenteAtleta.push(utente);
              //console.log("entrato perché è atleta")
            }
          });
        });
      }
      setAtleti(utenteAtleta);
    } catch (error) {
      console.log("ERRORE! Durante il caricamento di tutti gli utenti");
    }
  };
  //console.log(utenteAtleta)
  useEffect(() => {
    fetchAtleti();
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

          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              value={inputBarra}
              placeholder="Ricerca atleti..."
              aria-label="Search"
              onChange={(e) => {
                console.log(e.target.value);
                setInputBarra(e.target.value);
                if (e.target.value === "") {
                  risultatoAtleti = [...atleti];
                  console.log(risultatoAtleti);
                }
              }}
            />
            <Button
              className="btn btn-outline-success"
              onClick={() => {
                risultatoAtleti = [];
                atleti.forEach((atleta, index) => {
                  //console.log("nome: "+atleta.nome.toLocaleLowerCase())
                  if (
                    (
                      atleta.nome.toLowerCase() +
                      " " +
                      atleta.cognome.toLowerCase()
                    ).includes(inputBarra.toLocaleLowerCase())
                  ) {
                    console.log(atleta);
                    risultatoAtleti.push(atleta);
                    // setRisultatoAtleti(...RicercaAtleti,atleta)
                  }
                });
                console.log(risultatoAtleti);
              }}
            >
              Cerca
            </Button>
          </form>
          {  console.log(risultatoAtleti)}
          ciao
          {risultatoAtleti.map((atleta, index) => {
            return (
              <>
                <Card style={{ width: "18rem" }} key={index}>
                  <Card.Img variant="top" src="holder.js/100px180" />
                  <Card.Body>
                    <Card.Title>Atleta</Card.Title>
                    <Card.Text>
                      Nome: {atleta.nome}
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </div>
      )}
    </>
    
  );
};

export default RicercaAtleti;
