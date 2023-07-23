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
<footer class="text-center text-light pt-4 mt-5" id="footerAthletix">


    <Container class="container text-center mt-0">
      <Row class="row mt-3 row-cols-1 ">
        <Col>
        <h6 class="text-uppercase fw-bold mb-3">Repository</h6>
          <p>
          <Link to="https://github.com/gretel-hans" target={"_blank"}>Gretel-hans</Link>
             </p>
          </Col>
          <Col>
          <h6 class="text-uppercase fw-bold mb-3">Contatti</h6>
          <p><i class="fas fa-home me-3"></i> Adjei Hansel Sarpong</p>
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
  <div class="text-center p-4">
    © {dataAttuale} Copyright:&nbsp;<u>Athletix</u>
  </div>
</footer>
    </>
    )
}

export default AthletixFooter