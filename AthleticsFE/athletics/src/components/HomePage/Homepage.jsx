import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavbarAthletix from "./NavbarAthletix";
import Card from "react-bootstrap/Card";
import AccessoNegato from "./AccessoNegato";

const Homepage = () => {
  const [atleti, setAtleti] = useState([]);
  const [risultatoAtleti, setRisultatoAtleti] = useState([]);
  const [inputBarra, setInputBarra] = useState("");
  const [nessunRisultato, setNessunRisultato] = useState(false);
  let risultatoFiltrato = [];

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
      console.log(
        "ERRORE! Durante il caricamento di tutti gli atleti!" + error
      );
    }
  };
  useEffect(() => {
    fetchAtleti();
  }, []);

  return (
    <>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && <AccessoNegato />}

      {sessionStorage.getItem("username") !== null &&
        sessionStorage.getItem("username") !== "null" && (
          <div>
            <NavbarAthletix />
<h1 className="my-4"><b> Benvenuto/a nella Homepage di Athletix!</b></h1>
            <section className="gradient-custom pb-4">
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
                          setInputBarra(e.target.value);
                          if (e.target.value === "") {
                            setRisultatoAtleti(atleti);
                          }

                          let c = 0;
                          atleti.forEach((singoloAtleta) => {
                            if (
                              (
                                singoloAtleta.name.toLowerCase() +
                                " " +
                                singoloAtleta.lastname.toLowerCase()
                              ).includes(e.target.value.toLocaleLowerCase())
                            ) {
                              risultatoFiltrato.push(singoloAtleta);
                              setRisultatoAtleti(risultatoFiltrato);
                              setNessunRisultato(false);
                            } else {
                              risultatoFiltrato.push(undefined);
                              setRisultatoAtleti(risultatoFiltrato);
                              c++;
                            }
                          });
                          if (c === risultatoAtleti.length) {
                            setNessunRisultato(true);
                          }
                        }}
                      />
                    </form>

                    {nessunRisultato && (
                      <>
                        <h1>L'atleta cercato non è stato trovato!!</h1>
                      </>
                    )}

                    <Container>
                      <Row
                        className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center paginaErrore"
                        id="ricercaAtletiRow"
                      >
                        {risultatoAtleti.map((atleta, index) => {
                          if (atleta !== undefined) {
                            return (
                              <Col
                                className="card m-2 cardPagine"
                                style={{ width: "15rem", height: "14rem" }}
                                key={index}
                              >
                                <Card.Body>
                                  <Card.Title>Atleta</Card.Title>
                                  <Card.Text>
                                    <b>
                                      {" "}
                                      {atleta.name} {atleta.lastname}
                                    </b>
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

export default Homepage;
