import { useState } from "react";
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png"

import "./style.css"

export default function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function cadastrar(e) {
    e.preventDefault()

    if (!email && !password) {
        alert("Dados inválidos")
        return
    }
    else if (!email) {
        alert("E-mail inválido")
        return
    }
    else if (!password) {
        alert("Senha inválida")
        return
    }

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        alert("Cadastro realizado", userCredencial.user.email)

        setEmail("")
        setPassword("")
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") {
            alert("Email inválido")
        }
        else if ("auth/email-already-in-use") {
            alert("Email já cadastrado")
        }

        console.log("Erro no cadastro", error.code)
      })
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
          
          <button className="register__botao" onClick={cadastrar}>Cadastrar</button>

          <Link to="/">Já possui uma conta?</Link>
        </form>
      </div>
    </div>
  );
}
