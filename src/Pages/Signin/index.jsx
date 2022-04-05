import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png"
import loading from "../../assets/img/loading.gif"

import "./style.css"

export default function SignIn() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleSignIn(e) {
    e.preventDefault()

    if (email !== "" && password !== "" ) {
      signIn(email, password)
    }
  }

  return (
    <div className="container">
      <div className="login">
        <img src={logo} alt="Logo" className="login__logo" />

        <form className="login__area">
          <h2 className="login__titulo">Entrar</h2>

          <input type="email" placeholder="email@dominio.com.br" value={email} onChange={(e) => setEmail(e.target.value)} className="login__input"/>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="login__input" />
          
          <button className="login__botao" onClick={(e) => {handleSignIn(e)}}>
            {loadingAuth ? <img src={loading} alt="Logo" className="login__loading" /> : "Acessar"}
          </button>

          <Link to="/register">Cadastre-se</Link>
        </form>
      </div>
    </div>
  );
}
