import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import gareConcorsi from "../../dati/gareConcorsi.json";
import gareCorse from "../../dati/gareCorse.json";
import categorie from "../../dati/categorie.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccessoNegato from "../HomePage/AccessoNegato";

const EventoSpecifico = () => {
  const params = useParams();
  const [evento, setEvento] = useState({});
  const [gare, setGare] = useState([]);

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
        let gare1 = [...dato.listaGareConcorsi, ...dato.listaGareCorse];
        gare1.forEach((garaS, index) => {
          gareConcorsi.forEach((garaConc, index) => {
            if (garaS.tipo === garaConc.value) {
              garaS.tipo = garaConc.label;
            }
          });
        });
        gare1.forEach((garaS, index) => {
          gareCorse.forEach((garaCorsa, index) => {
            if (garaS.tipo === garaCorsa.value) {
              garaS.tipo = garaCorsa.label;
            }
          });
        });
        setGare(gare1);
      }
    } catch (error) {
      console.log("ERRORE!! Durante il caricamento dell'evento!" + error);
    }
  };

  useEffect(() => {
    fetchEvento();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && <AccessoNegato />}

      {sessionStorage.getItem("username") !== null &&
        sessionStorage.getItem("username") !== "null" && (
          <div>
            <NavbarAthletix />
            <section className=" gradient-custom ContenitoreGare">
              <div className="container h-100">
                <div className="row d-flex justify-content-center h-100 mt-3">
                  <div className="col-12 ">
                    <h1>
                      <b>{evento.nomeEvento}</b>
                    </h1>
                    <p>{evento.dataEvento}</p>
                    {evento.organizzatori && (
                      <>
                        <p> {evento.organizzatori.name}</p>
                        <p>
                          {" "}
                          <a href={`mailto:${evento.organizzatori.email}`}>
                            {" "}
                            {evento.organizzatori.email}
                          </a>
                        </p>
                        <p>
                          {" "}
                          {evento.organizzatori.indirizzo.comune.nomeComune} (
                          {evento.organizzatori.indirizzo.comune.provinca.sigla}
                          ) - Via {evento.organizzatori.indirizzo.nomeVia}{" "}
                          {evento.organizzatori.indirizzo.civico},{" "}
                          {evento.organizzatori.indirizzo.comune.cap}
                        </p>
                      </>
                    )}
                    <hr></hr>
                    <h3 className="mt-2 mb-5">Elenco Gare e iscritti</h3>
                    {gare.map((garaSingola, index) => {
                      return (
                        <div key={index} className="my-4" id="contenitoreGara">
                          <h5>
                            {" "}
                            <u>
                              {garaSingola.tipo} {garaSingola.categoria}
                            </u>
                          </h5>
                          <Container>
                            <Row>
                              {garaSingola.partecipanti.length > 0 && (
                                <>
                                  <Col>Numero</Col>
                                  <Col>Atleta</Col>
                                  <Col className="dataAtleta">Anno</Col>
                                  <Col className="categoriaAtleta">
                                    Categoria
                                  </Col>
                                  <Col className="societaAtleta">Società</Col>
                                </>
                              )}

                              {garaSingola.partecipanti.length > 0 &&
                                garaSingola.partecipanti.map(
                                  (atleta, indexA) => {
                                    return (
                                      <div
                                        key={indexA}
                                        className="d-flex px-0 align-items-center my-3"
                                      >
                                        <Col>{indexA + 1}</Col>
                                        <Col>
                                          {atleta.name} {atleta.lastname}
                                        </Col>
                                        <Col className="dataAtleta">
                                          {atleta.birthdate.slice(0, 4)}
                                        </Col>

                                        {categorie.map((categoria, indexC) => {
                                          if (
                                            atleta.age >= categoria.range1 &&
                                            atleta.age <= categoria.range2
                                          ) {
                                            return (
                                              <Col
                                                key={indexC}
                                                className="categoriaAtleta"
                                              >
                                                {categoria.nome}
                                                {garaSingola.genereGara}
                                              </Col>
                                            );
                                          }
                                        })}

                                        <Col className="societaAtleta">
                                          {atleta.societa.name}
                                        </Col>
                                      </div>
                                    );
                                  }
                                )}
                            </Row>
                          </Container>

                          {garaSingola.partecipanti.length === 0 && (
                            <>Non ci sono iscritti presenti!</>
                          )}
                        </div>
                      );
                    })}
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
