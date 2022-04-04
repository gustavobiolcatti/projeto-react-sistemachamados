import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth"

import logo from "../../assets/img/logo.png"

import "./style.css"
import { Link } from "react-router-dom";

export default function SignIn() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function logar(e) {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        alert("Login realizado", userCredencial.user.email)

        setEmail("")
        setPassword("")
      })
      .catch((error) => {
        console.log("Erro no login", error.code)
      })
  }

  return (
    <div className="container">
      <div className="login">
        <img src={logo} alt="Logo" className="login__logo" />

        <form className="login__area">
          <h2 className="login__titulo">Entrar</h2>

          <input type="email" placeholder="email@dominio.com.br" value={email} onChange={(e) => setEmail(e.target.value)} className="login__input"/>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="login__input" />
          
          <button className="login__botao" onClick={logar}>Acessar</button>

          <Link to="/register">Cadastre-se</Link>
        </form>
      </div>
    </div>
  );
}
