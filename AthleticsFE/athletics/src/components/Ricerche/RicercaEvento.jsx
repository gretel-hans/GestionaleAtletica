import { useEffect, useState } from "react";
import NavbarAthletix from "../HomePage/NavbarAthletix"
import { Button, Container, Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const RicercaEvento=()=>{

  let [evento, setEvento] = useState([]);
  let [inputBarra, setInputBarra] = useState("");
  let [risultatoLive, setRisultatoLive]= useState([]);

  const fetchEventi = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/eventi", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("bearerToken"),
        },
      });
      if (response.ok) {
        let data = await response.json();
        setEvento(data);
        setRisultatoLive(data)
        console.log(risultatoLive)
      }
    } catch (error) {
      console.log("ERRORE! Durante il caricamento di tutti gli eventi");
    }
  };
  //console.log(utenteAtleta)
  let risultatoFiltrato=[];
  useEffect(() => {
    fetchEventi();
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
        sessionStorage.getItem("username") !== "null") &&(
            <>
            <NavbarAthletix/>
            <section className="vh-100 gradient-custom">
            <div className="container h-100">
              <div className="row d-flex justify-content-center h-100  mt-3">
                <div className="col-12 col-md-11">
                  <form className="d-flex" role="search">
                    <input
                      className="form-control me-2"
                      type="search"
                      value={inputBarra}
                      placeholder="Ricerca eventi..."
                      aria-label="Search"
                      
                      onChange={(e) => {
                        setInputBarra(e.target.value);
                        
                        evento.forEach((eventoSingolo)=>{
                          if((eventoSingolo.nomeEvento.toLowerCase()).includes(e.target.value.toLocaleLowerCase())){
                            risultatoFiltrato.push(eventoSingolo)
                            setRisultatoLive(risultatoFiltrato)
                          }else{
                            risultatoFiltrato.push(undefined)
                            setRisultatoLive(risultatoFiltrato)
                          }
                        })
                        console.log(risultatoLive)
                      }}
                    />

                  </form>

                  <Container>
                    <Row className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center" id="ricercaAtletiRow">
                      {risultatoLive.map((evento, index) => {
                        if (evento!==undefined){
                          return (
                            <Col
                              className="card m-2"
                              style={{ width: "15rem" }}
                              key={index}
                            >
                              <Card.Body>
                                <Card.Title>Evento</Card.Title>
                                <Card.Text>
                                  Nome: {evento.nomeEvento}
                                  <br />
                                  Data: {evento.dataEvento}
                                  
                                </Card.Text>
                              </Card.Body>
                            </Col>
                          );
                        }
                      })}
                    </Row>
                  </Container>
                </div>
              </div>
            </div>
          </section>
            </>
        )}

        </>
    )
}

export default RicercaEvento;