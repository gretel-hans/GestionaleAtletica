import  Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const AthletixFooter=()=>{

    let dataAttuale=new Date().getFullYear()

    return(
        <>
<footer className="text-center text-light pt-4 mt-5" id="footerAthletix">


    <Container className="container text-center my-0">
      <Row className="row mt-3 row-cols-1 ">
        <Col>
        <h6 className="text-uppercase fw-bold mb-3 titoli">Repository</h6>
          <p>
          <Link to="https://github.com/gretel-hans" target={"_blank"}>Gretel-hans</Link>
             </p>
          </Col>
          <Col>
          <h6 className="text-uppercase fw-bold mb-3 titoli">Contatti</h6>
          <p><i className="fas fa-home me-3"></i> Adjei Hansel Sarpong</p>
          <p>
            <Link to="mailto:adjeihansel@icloud.com">adjeihansel@icloud.com</Link>
          </p>
          <p>
            <Link to="Tel:+393476952468">+39 347 695 2468</Link>
            </p>
        </Col>
      </Row>
    </Container>
  <hr></hr>
  <div className="text-center p-4 titoli">
    © {dataAttuale} Copyright:&nbsp;<u>Athletix</u>
  </div>
</footer>
    </>
    )
}

export default AthletixFooter