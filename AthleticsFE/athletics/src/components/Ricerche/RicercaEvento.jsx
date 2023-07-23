import { useEffect, useState } from "react";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AccessoNegato from "../HomePage/AccessoNegato";

const RicercaEvento = () => {
  const [evento, setEvento] = useState([]);
  const [inputBarra, setInputBarra] = useState("");
  const [risultatoLive, setRisultatoLive] = useState([]);
  let risultatoFiltrato = [];
  const [nessunRisultato, setNessunRisultato] = useState(false);

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
        setRisultatoLive(data);
      }
    } catch (error) {
      console.log(
        "ERRORE! Durante il caricamento di tutti gli eventi!" + error
      );
    }
  };
  useEffect(() => {
    fetchEventi();
  }, []);
  return (
    <>
      {sessionStorage.getItem("username") === null && <AccessoNegato />}
      {sessionStorage.getItem("username") !== null &&
        sessionStorage.getItem("username") !== "null" && (
          <>
            <NavbarAthletix />
            <section className="gradient-custom pb-4">
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
                          let c = 0;
                          evento.forEach((eventoSingolo) => {
                            if (
                              eventoSingolo.nomeEvento
                                .toLowerCase()
                                .includes(e.target.value.toLocaleLowerCase())
                            ) {
                              risultatoFiltrato.push(eventoSingolo);
                              setRisultatoLive(risultatoFiltrato);
                              setNessunRisultato(false);
                            } else {
                              risultatoFiltrato.push(undefined);
                              setRisultatoLive(risultatoFiltrato);
                              c++;
                            }
                          });
                          if (c === risultatoLive.length) {
                            setNessunRisultato(true);
                          }
                        }}
                      />
                    </form>
                    {nessunRisultato && (
                      <>
                        <h1>L'evento cercato non è stato trovato!!</h1>
                      </>
                    )}
                    <Container>
                      <Row
                        className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center align-items-center paginaErrore"
                        id="ricercaAtletiRow"
                      >
                        {risultatoLive.map((evento, index) => {
                          if (evento !== undefined) {
                            return (
                              <Col
                                className="card m-2 cardPagine"
                                style={{ width: "15rem", height: "17rem" }}
                                key={index}
                              >
                                <Card.Body
                                  className="cardEvento"
                                  onClick={() =>
                                    window.location.replace(
                                      `/eventoSpecifico/${evento.id}`
                                    )
                                  }
                                >
                                  <Card.Title>Evento</Card.Title>
                                  <Card.Text>
                                    <b>{evento.nomeEvento} </b>
                                    <br />
                                    Data: {evento.dataEvento}
                                    <br />
                                    Organizzatore: {evento.organizzatori.name}
                                    <br />
                                    Luogo: Via{" "}
                                    {evento.organizzatori.indirizzo.nomeVia +
                                      " " +
                                      evento.organizzatori.indirizzo.civico +
                                      ", " +
                                      evento.organizzatori.indirizzo.comune
                                        .cap +
                                      " " +
                                      evento.organizzatori.indirizzo.comune
                                        .provinca.sigla}
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
  );
};

export default RicercaEvento;
