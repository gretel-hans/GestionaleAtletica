import { Link } from "react-router-dom";

const PaginaInesistente = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 paginaErrore">
        <div className="text-center sfondoErrore">
          <h1 className="display-1 fw-bold titoli">404</h1>
          <p className="fs-3">
            {" "}
            <span className="text-danger titoli">Opps!</span> Pagina non trovata.
          </p>
          <p className="lead titoli">La pagina che stai cercando non esiste!</p>
          <Link to="/Homepage" className="btn btn-dark">
            Torna alla Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaginaInesistente;
