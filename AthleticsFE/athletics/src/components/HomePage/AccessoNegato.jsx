import { Link } from "react-router-dom"

const AccessoNegato=()=>{
    return(
        <div className="d-flex align-items-center justify-content-center vh-100 paginaErrore">
            <div className="text-center sfondoErrore">
                <h1 className="display-1 fw-bold ">401</h1>
                <p className="fs-3 text-danger">Accesso negato.</p>
                <p className="lead">
                    Per poter accedere ai contenuti di Athletix devi effettuare l'accesso!
                  </p>
                <Link to="/Login" className="btn btn-dark">Accedi</Link>
            </div>
        </div>
        
        )
        
}

export default AccessoNegato