import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavbarAthletix = () => {
  const [utente, setUtene] = useState();

  const [allenatore, setAllenatore] = useState(false);
  const [societa, setSocieta] = useState(false);
  const [atleta, setAtleta] = useState(false);

const verificaRuoli=(ruoli)=>{
  ruoli.forEach((ruolo,index) => {
    if(ruolo.roleName==="ROLE_ATLETA"){
      setAtleta(true)
    }else if(ruolo.roleName==="ROLE_ALLENATORE"){
      setAllenatore(true)
    }else if(ruolo.roleName==="ROLE_SOCIETA")
    setSocieta(true)
  });
}

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
      }
    } catch (error) {
      console.log("ERRORE " + error);
    }
  };

  const esciAccount=()=>{
    sessionStorage.setItem("username",null)
    sessionStorage.setItem("bearerToken",null)
    window.location.replace("/Login")
  }

  useEffect(() => {
    let username = sessionStorage.getItem("username");
    let token = sessionStorage.getItem("bearerToken");
    fetchUtente(username, token);
  }, []);


 
  return (
    <>
      <Navbar
        expand="sm"
        className="bg-dark border-bottom border-bottom-dark"
        data-bs-theme="dark"
      >
        <Container fluid>
          <Link to="/Homepage" className="navbar-brand">
            <img id="LogoAthletix" src="./images/LogoAthletix.png" alt="Logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" onClick={esciAccount}>Logout</Nav.Link>
              {societa&&(
                <Link to="/creaEvento" className="nav-link">Crea Evento</Link>
              )}
              {allenatore&&(
                <Link to="/IscrizioniGare" className="nav-link">Effettua iscrizioni</Link>
              )}
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarAthletix;
