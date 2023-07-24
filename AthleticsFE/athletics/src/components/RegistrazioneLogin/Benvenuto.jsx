import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Benvenuto = () => {
  const navigate = useNavigate();

  const NavigateReg = () => {
    navigate("/Registrazione");
  };
  const NavigateLog = () => {
    navigate("/Login");
  };

  return (
    <Container>
      <div
        id="Benvenuto"
        className="d-flex align-items-center justify-content-center"
      >
        <div
          id="BenvenutoDivOne"
          className="d-flex flex-column justify-content-around p-4 sfondoErrore"
        >
          <h1 className="my-0">
            <i>
              Benvenuto su <b>ATHLETIX...</b>
            </i>
          </h1>
          <Row className="row-cols-1 row-cols-sm-2">
            <Col className="d-flex justify-content-evenly mb-2">
              <Button
                variant="light"
                className="btn-lg btn-outline-dark"
                onClick={NavigateReg}
              >
                Registrazione
              </Button>
            </Col>
            <Col>
              <Button
                variant="dark"
                className="btn-lg btn-outline-light"
                onClick={NavigateLog}
              >
                Login
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Benvenuto;
