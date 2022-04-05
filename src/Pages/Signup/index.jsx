import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import logo from "../../assets/img/logo.png"

import "./style.css"

export default function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {signUp} = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault()

    if (name !== "" && email !== "" && password !== "") {
      signUp(name, email, password)
    }
  }

  return (
    <div className="container">
      <div className="register">
        <img src={logo} alt="Logo" className="register__logo" />

        <form className="register__area">
          <h2 className="register__titulo">Cadastrar uma conta</h2>

          <input type="text" placeholder="Nome Sobrenome" value={name} onChange={(e) => setName(e.target.value)} className="register__input" />
          <input type="email" placeholder="email@dominio.com.br" value={email} onChange={(e) => setEmail(e.target.value)} className="register__input"/>
          <input type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} className="register__input" />
          
          <button className="register__botao" onClick={(e) => {handleSubmit(e)}}>Cadastrar</button>

          <Link to="/">Já possui uma conta?</Link>
        </form>
      </div>
    </div>
  );
}
