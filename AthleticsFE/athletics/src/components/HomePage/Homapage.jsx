import { useEffect } from "react";
import NavbarAthletix from "./NavbarAthletix";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AccessoNegato from "./AccessoNegato";

const Homepage = () => {
  let societa = [];
  let atleti = [];

  const fetchUtenti = async () => {
    try {
      let response = await fetch("http://localhost:8080/athletics/utenti");
      if (response.ok) {
        let data = await response.json();

        data.forEach((utente, indexUtente) => {
          let ruoli = [...utente.roles];
          ruoli.forEach((ruolo, index) => {
            if (ruolo.roleName === "ROLE_SOCIETA") {
              societa.push(utente);
            } else if (ruolo.roleName === "ROLE_ATLETA") {
              atleti.push(utente);
            }
          });
        });
      }
    } catch (error) {
      console.log("ERRORE! Durante il caricamento di tutti gli utenti!");
    }
  };

  useEffect(() => {
    fetchUtenti();
  }, []);

  return (
    <div>
      {(sessionStorage.getItem("username") === null ||
        sessionStorage.getItem("username") === "null") && <AccessoNegato />}

      {sessionStorage.getItem("username") !== null &&
        sessionStorage.getItem("username") !== "null" && (
          <div>
            <NavbarAthletix />
            <Container className="mt-3">
              <Row className="row-cols-1">
                <Col></Col>
                <Col>2</Col>
                <Col>3</Col>
              </Row>
            </Container>
            <h1>Benvenuto {sessionStorage.getItem("username")}!!</h1>
          </div>
        )}
    </div>
  );
};

export default Homepage;
