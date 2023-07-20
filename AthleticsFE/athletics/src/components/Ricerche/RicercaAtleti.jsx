import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Card from "react-bootstrap/Card";

const RicercaAtleti = () => {
  let [atleti, setAtleti] = useState([]);
  let [risultatoAtleti, setRisultatoAtleti] = useState([]);
  let [inputBarra, setInputBarra] = useState("");
  const [mostraAtleti,setMostraAtleti]= useState(true);

  const fetchAtleti = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/atleti", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        setAtleti(data);
        setRisultatoAtleti(data);
      }
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
          <section className="vh-100 gradient-custom">
            <div className="container h-100">
              <div className="row d-flex justify-content-center h-100  mt-3">
                <div className="col-12 col-md-11">
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      value={inputBarra}
                      placeholder="Ricerca atleti..."
                      aria-label="Search"
                      onChange={(e) => {
                        //console.log(e.target.value);
                        setInputBarra(e.target.value);
                        if (e.target.value === "") {
                          setRisultatoAtleti(atleti);
                          //console.log(risultatoAtleti);
                          setMostraAtleti(true)
                        }
                      }}
                    />
                    <Button
                      variant="outline-light"
                      onClick={() => {
                        risultatoAtleti = [];
                        atleti.forEach((atleta, index) => {
                          //console.log("nome: "+atleta.nome.toLocaleLowerCase())
                          if (
                            (
                              atleta.name.toLowerCase() +
                              " " +
                              atleta.lastname.toLowerCase()
                            ).includes(inputBarra.toLocaleLowerCase())
                          ) {
                            //console.log(atleta);
                            risultatoAtleti.push(atleta);
                            setRisultatoAtleti(risultatoAtleti);
                            setMostraAtleti(true)
                          }
                        });
                        if(risultatoAtleti.length===0){
                          //console.log("nessun atleta trovato")
                          setMostraAtleti(false)
                        }
                        //console.log(risultatoAtleti);
                      }}
                    >
                      Cerca
                    </Button>
                  </form>
                  {!mostraAtleti&&(
                    <div className="mt-3">
                    <h2>L'atleta cercato non esiste nell'elenco di atleti presenti!!</h2>
                    </div>
                  )}
                  {mostraAtleti&&(
                  <Container>
                    <Row className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center" id="ricercaAtletiRow">
                      {risultatoAtleti.map((atleta, index) => {
                        return (
                          <Col
                            className="card m-2"
                            style={{ width: "15rem" }}
                            key={index}
                          >
                            <Card.Body>
                              <Card.Title>Atleta</Card.Title>
                              <Card.Text>
                                Nome: {atleta.name}
                                <br />
                                Cognome: {atleta.lastname}
                                <br />
                                Età: {atleta.age}
                                <br />
                                Genere: {atleta.genere}
                                <br />
                                Societa: {atleta.societa.name}
                              </Card.Text>
                            </Card.Body>
                          </Col>
                        );
                      })}
                    </Row>
                  </Container>
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

export default RicercaAtleti;
