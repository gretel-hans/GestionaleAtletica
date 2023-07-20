import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Card from "react-bootstrap/Card";

const RicercaSocieta = () => {
  let [societa, setSocieta] = useState([]);
  let [risultatoSocieta, setRisultatoSocieta] = useState([]);
  let [inputBarra, setInputBarra] = useState("");
  const [mostraSocieta,setMostraSocieta]= useState(true);

  const fetchSocieta = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/societa", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        setSocieta(data);
        setRisultatoSocieta(data);
      }
    } catch (error) {
      console.log("ERRORE! Durante il caricamento di tutti gli utenti");
    }
  };
  //console.log(utenteAtleta)
  useEffect(() => {
    fetchSocieta();

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
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      value={inputBarra}
                      placeholder="Ricerca società..."
                      aria-label="Search"
                      onChange={(e) => {
                        //console.log(e.target.value);
                        setInputBarra(e.target.value);
                        if (e.target.value === "") {
                          setRisultatoSocieta(societa);
                          //console.log(risultatoSocieta);
                          setMostraSocieta(true)
                        }
                      }}
                    />
                    <Button
                    variant="outline-light"
                      
                      onClick={() => {
                        risultatoSocieta = [];
                        societa.forEach((societa, index) => {
                          //console.log("nome: "+societa.nome.toLocaleLowerCase())
                          if (
                            (societa.name.toLowerCase()).includes(inputBarra.toLocaleLowerCase())
                          ) {
                            //console.log(societa);
                            risultatoSocieta.push(societa);
                            setRisultatoSocieta(risultatoSocieta);
                            setMostraSocieta(true)
                          }
                        });
                        if(risultatoSocieta.length===0){
                          //console.log("nessuna societa trovata")
                          setMostraSocieta(false)
                        }
                       // console.log(risultatoSocieta);
                      }}
                    >
                      Cerca
                    </Button>
                  </form>
                  {!mostraSocieta&&(
                    <div className="mt-3">
                    <h2>La società cercata non esiste nell'elenco di società presenti!!</h2>
                    </div>
                  )}
                  {mostraSocieta&&(
                  <Container>
                    <Row className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center" id="ricercaAtletiRow">
                      {risultatoSocieta.map((societa, index) => {
                        return (
                          <Col
                            className="card m-1 "
                            style={{ width: "14rem", height:"15em" }}
                            key={index}
                          >
                            <Card.Body>
                              <Card.Title>Società</Card.Title>
                              <Card.Text>
                                 <b>{societa.name}</b>
                                <br />
                                Regione: {societa.indirizzo.comune.provinca.regione}
                                <br />
                                Provincia: {societa.indirizzo.comune.provinca.nome}
                                <br/>
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

export default RicercaSocieta;
