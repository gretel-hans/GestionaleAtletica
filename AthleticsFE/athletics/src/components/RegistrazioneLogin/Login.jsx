import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {

const [mostraPass,setMostraPass]=useState(true);

const [datiLogin,setDatiLogin]=useState({username:"",password:""})

const fetchLogin= async()=>{
  let response=await
  console.log(datiLogin);

}

const fetchTuttiUtenti=()=>{
fetch("local")
}

useEffect(()=>{
fetchTuttiUtenti()
},[])


  return (
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{border:"border-radius: 1rem"}}>
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-0">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">
                      Inserisci il tuo username e password
                    </p>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        placeholder="Username...."
                        value={datiLogin.username}
                        onChange={(e)=>{setDatiLogin(
                            {password:datiLogin.password,
                            username:e.target.value}
                            )}}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type={mostraPass?"password":"text"}
                        id="typePasswordX"
                        className="form-control form-control-lg small-text mb-2"
                        placeholder="Password..."
                        value={datiLogin.password}
                        onChange={(e)=>{setDatiLogin({
                            password:e.target.value,
                            username:datiLogin.username
                        })}}
                      />
                      <i className="bi bi-eye mt-3 mostraPass" onClick={()=>setMostraPass(!mostraPass)}></i>
                    </div>
                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-4"
                      onClick={fetchLogin}
                    >
                      Login
                    </button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                      <a href="#!" className="text-white">
                        <i className="fab fa-facebook-f fa-lg"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-twitter fa-lg mx-4 px-2"></i>
                      </a>
                      <a href="#!" className="text-white">
                        <i className="fab fa-google fa-lg"></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Non hai un account?{" "}
                      <Link to='/Registrazione'>
                        Registrati!
                      </Link>
                      <a href="#!" className="text-white-50 fw-bold">
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
