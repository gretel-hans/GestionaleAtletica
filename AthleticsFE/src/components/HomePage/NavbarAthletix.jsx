import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { SALVA_INFO } from "../../redux/reducers/SalvaInfoUtente";

const NavbarAthletix = () => {
  const [utente, setUtene] = useState();

  const [allenatore, setAllenatore] = useState(false);
  const [societa, setSocieta] = useState(false);
  const [atleta, setAtleta] = useState(false);
  const dispatch = useDispatch();

  const verificaRuoli = (ruoli) => {
    ruoli.forEach((ruolo, index) => {
      if (ruolo.roleName === "ROLE_ATLETA") {
        setAtleta(true);
      } else if (ruolo.roleName === "ROLE_ALLENATORE") {
        setAllenatore(true);
      } else if (ruolo.roleName === "ROLE_SOCIETA") setSocieta(true);
    });
  };

  const fetchU = async (id,s) => {
    try {
      let response = await fetch(`http://localhost:8080/athletics/${s}/${id}`,{
        headers:{
          Authorization:"Bearer "+localStorage.getItem("bearerToken")
        }
      });
      if (response.ok) {
        let dati = await response.json();
        console.log(dati);
        dispatch({
          type:SALVA_INFO,
          payload:dati
        })
      }
    } catch (error) {
      console.log("ERRORE!! Nella lettura dei dati dell'utente!")
    }
  };

  const fetchUtente = async (u, t) => {
    try {
      let response = await fetch(
        `http://localhost:8080/athletics/utenti/verifica`,
        {
          method: "POST",
          body: JSON.stringify({ username: u, token: t }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        let data = await response.json();
        setUtene(data);
        verificaRuoli(data.roles);
        data.roles.forEach((ruolo, index) => {
          if (ruolo.roleName === "ROLE_SOCIETA") {
            fetchU(data.id,"societa");
          } else if (ruolo.roleName === "ROLE_ATLETA") {
            fetchU(data.id,"atleti")
          }else{
            fetchU(data.id,"allenatori")
          }
        });
      }
    } catch (error) {
      console.log("ERRORE " + error);
    }
  };

  const esciAccount = () => {
    localStorage.setItem("username", null);
    localStorage.setItem("bearerToken", null);
    window.location.replace("/Login");
  };

  useEffect(() => {
    let username = localStorage.getItem("username");
    let token = localStorage.getItem("bearerToken");
    fetchUtente(username, token);
  }, []);

  return (
    <>
      <Navbar
        expand="sm"
        className="bg-dark border-bottom border-bottom-dark "
        data-bs-theme="dark"
        id="navbarAthletix"
      >
        <Container fluid>
          <Link to="/Homepage" className="navbar-brand">
            <img id="LogoAthletix" src="/images/LogoAthletix.png" alt="Logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={esciAccount}>
                Logout
              </Nav.Link>
              {societa && (
                <Link to="/creaEvento" className="nav-link">
                  Crea Evento
                </Link>
              )}
              {allenatore && (
                <Link to="/IscrizioniGare" className="nav-link">
                  Effettua iscrizioni
                </Link>
              )}
              <Link to="/ricercaEventi" className="nav-link">
                Eventi
              </Link>
              <Link to="/ricercaSocieta" className="nav-link">
                Società
              </Link>
              <Link to="/Homepage" className="nav-link">
                Homepage
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarAthletix;
