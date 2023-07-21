import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import NavbarAthletix from "../HomePage/NavbarAthletix";
import Card from "react-bootstrap/Card";

const RicercaAtleti = () => {
  const [atleti, setAtleti] = useState([]);
  const [risultatoAtleti, setRisultatoAtleti] = useState([]);
  const [inputBarra, setInputBarra] = useState("");
  const [nessunRisultato, setNessunRisultato] = useState(false);
  let risultatoFiltrato=[];

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

      {(sessionStorage.getItem("username") !== null ) && (
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
                        setInputBarra(e.target.value);
                        if (e.target.value === "") {
                          setRisultatoAtleti(atleti);
                        }

                        let c=0
                        atleti.forEach((singoloAtleta)=>{

                          if ((singoloAtleta.name.toLowerCase() +" " +singoloAtleta.lastname.toLowerCase()).includes(e.target.value.toLocaleLowerCase())) {
                            risultatoFiltrato.push(singoloAtleta);
                            setRisultatoAtleti(risultatoFiltrato);
                            setNessunRisultato(false)
                          }else{
                            risultatoFiltrato.push(undefined);
                            setRisultatoAtleti(risultatoFiltrato);
                            c++
                          }
                        })
                        if(c===risultatoAtleti.length){
                          setNessunRisultato(true)
                        }

                        //console.log(risultatoAtleti)
                      }}
                    />

                  </form>

{nessunRisultato&&(
  <>
  <h1>L'atleta cercato non è stato trovato!!</h1>
  </>
)}

                  <Container>
                    <Row className="row-cols-1 row-cols-sm-4 mt-4 justify-content-center" id="ricercaAtletiRow">
                      {risultatoAtleti.map((atleta, index) => {
                        if (atleta!==undefined){
                        return (
                          <Col
                            className="card m-2"
                            style={{ width: "15rem",height: "14rem" }}
                            key={index}
                          >
                            <Card.Body>
                              <Card.Title>Atleta</Card.Title>
                              <Card.Text>
                                <b> {atleta.name} {atleta.lastname}</b>
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

export default RicercaAtleti;
