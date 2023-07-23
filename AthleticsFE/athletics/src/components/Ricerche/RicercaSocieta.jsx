import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Card from "react-bootstrap/Card";
import AccessoNegato from "../HomePage/AccessoNegato";

const RicercaSocieta = () => {
  const [societa, setSocieta] = useState([]);
  const [risultatoSocieta, setRisultatoSocieta] = useState([]);
  const [inputBarra, setInputBarra] = useState("");
  const [nessunRisultato, setNessunRisultato] = useState(false);
  let risultatoFiltrato = [];

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
      console.log(
        "ERRORE! Durante il caricamento di tutte le società!" + error
      );
    }
  };
  useEffect(() => {
    fetchSocieta();
  }, []);

  return (
    <>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && <AccessoNegato />}

      {sessionStorage.getItem("username") !== null &&
        sessionStorage.getItem("username") !== "null" && (
          <div>
            <NavbarAthletix />
            <section className="pb-4 gradient-custom">
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
                          setInputBarra(e.target.value);
                          let c = 0;
                          societa.forEach((societa, index) => {
                            if (
                              societa.name
                                .toLowerCase()
                                .includes(e.target.value.toLocaleLowerCase())
                            ) {
                              risultatoFiltrato.push(societa);
                              setRisultatoSocieta(risultatoFiltrato);
                              setNessunRisultato(false);
                            } else {
                              risultatoFiltrato.push(undefined);
                              setRisultatoSocieta(risultatoFiltrato);
                              c++;
                            }
                          });
                          if (c === risultatoSocieta.length) {
                            setNessunRisultato(true);
                          }
                        }}
                      />
                    </form>

                    {nessunRisultato && (
                      <>
                        <h1>La società cercata non è stato trovato!!</h1>
                      </>
                    )}

                    <Container>
                      <Row
                        className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center align-items-center paginaErrore"
                        id="ricercaAtletiRow"
                      >
                        {risultatoSocieta.map((societa, index) => {
                          if (societa !== undefined) {
                            return (
                              <Col
                                className="card m-1 cardPagine"
                                style={{ width: "14rem", height: "15em" }}
                                key={index}
                              >
                                <Card.Body>
                                  <Card.Title>Società</Card.Title>
                                  <Card.Text>
                                    <b>{societa.name}</b>
                                    <br />
                                    Regione:{" "}
                                    {societa.indirizzo.comune.provinca.regione}
                                    <br />
                                    Provincia:{" "}
                                    {societa.indirizzo.comune.provinca.nome}
                                    <br />
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
          </div>
        )}
    </>
  );
};

export default RicercaSocieta;
