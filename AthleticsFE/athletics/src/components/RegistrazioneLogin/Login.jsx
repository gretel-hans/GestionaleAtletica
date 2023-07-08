import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Login = () => {
  const [mostraPass, setMostraPass] = useState(true);

  const [datiLogin, setDatiLogin] = useState({ username: "", password: "" });

  const [utenti, setUtenti] = useState([]);
  const [token, setToken] = useState();
  const [counter , setCounter] = useState(0);

  let pass = document.getElementById("typePasswordX");
  let user = document.getElementById("typeEmailX");
  let scritta = document.getElementById("scrittaErratiDatiLogin");

  const fetchLogin = async () => {
    console.log(datiLogin);
    try {
      let response = await fetch("http://localhost:8080/athletics/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datiLogin),
      });
      if (response.ok) {
        let token = await response.json();
        console.log("token valido");
        setToken(token.accessToken);
        sessionStorage.setItem("bearerToken",token.accessToken);
        sessionStorage.setItem("username",token.username);
        pass.style.border="1.5px solid white";
        user.style.border="1.5px solid white";
        scritta.style.display="none"
        window.location.replace('/Homepage')
      } else {
        console.log("Username o password errati!");
        pass.style.border="1.5px solid red";
        user.style.border="1.5px solid red";
        scritta.style.display="block"
      }
    } catch (error) {
      console.log("ERRORE !:" + error);
    }
  };


  /*
const fetchTuttiUtenti= async()=>{
  let response=await fetch("http://localhost:8080/athletics/utenti");
  let data=await response.json();
  setUtenti(data);
  
}*/

  useEffect(() => {
    console.log("cambiato ")
    window.location.reload()
    //fetchTuttiUtenti()
  }, [counter]);

  return (
    <div>

{
 (sessionStorage.getItem("username")!=null&&(
        <div>
                <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ border: "border-radius: 1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-0">
                    <h2 className="fw-bold mb-2 text-uppercase">Benvenuto {sessionStorage.getItem("username")}</h2>

                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-4"
                      onClick={()=>{window.location.replace('/Homepage')}}
                    >
                      Accedi
                    </button>
                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-4"
                      onClick={()=>{
                        //setLoggato(!loggato)
                        sessionStorage.setItem("username",null)
                        sessionStorage.setItem("bearerToken",null)
                      }}
                    >
                      Cambia account
                    </button>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      ))

      
}
{
  (sessionStorage.getItem("username")==null&&(
    <div>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ border: "border-radius: 1rem" }}
              >
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
                        onChange={(e) => {
                          setDatiLogin({
                            password: datiLogin.password,
                            username: e.target.value,
                          });
                        }}
                      />
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type={mostraPass ? "password" : "text"}
                        id="typePasswordX"
                        className="form-control form-control-lg small-text mb-2"
                        placeholder="Password..."
                        value={datiLogin.password}
                        onChange={(e) => {
                          setDatiLogin({
                            password: e.target.value,
                            username: datiLogin.username,
                          });
                        }}
                      />
                      <i
                        className="bi bi-eye mt-3 mostraPass"
                        onClick={() => setMostraPass(!mostraPass)}
                      ></i>
                      <p id="scrittaErratiDatiLogin">Username e/o password errati!</p>
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
                      <Link to="/Registrazione">Registrati!</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ))
}



    </div>
  );
};

export default Login;