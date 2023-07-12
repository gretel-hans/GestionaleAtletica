import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarAthletix=()=>{
  const [utente,setUtene]=useState()



  const fetchUtente= async(u,t)=>{
  console.log(t)
    try {
      let response = await fetch(`http://localhost:8080/athletics/utenti/verifica`,{
        method:"POST",
        body:JSON.stringify({username:u,token:t}),
        headers:{
          'Content-Type':'application/json'
        }
      });
      if(response.ok){
        let data= await response.json();
        setUtene(data);
        sessionStorage.setItem("utenteInfo",data)
        let datiUtente=sessionStorage.getItem("utenteInfo")
        console.log(datiUtente.username)
      }
      
    } catch (error) {
      console.log("ERRORE "+error)
    }
  
  }


  useEffect(()=>{


    let username=sessionStorage.getItem("username")
    let token=sessionStorage.getItem("bearerToken")
    console.log(username, "token: "+token)
      fetchUtente(username,token);
    
    console.log("entrato")
  },[])



    return(
        <>
<Navbar expand="lg" className="bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
      <Container fluid>
      <Link to="/Homepage" className="navbar-brand"><img id="LogoAthletix" src="./images/LogoAthletix.png" alt="Logo"/></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
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
    )
}

export default NavbarAthletix;