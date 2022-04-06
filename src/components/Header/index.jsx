import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { Link } from "react-router-dom"
import { FiHome, FiUser, FiSettings } from "react-icons/fi";

import avatar from "../../assets/img/avatar.png"

import "./style.css"

export default function Header() {

    const { user } = useContext(AuthContext)

    return (
        <div className="sidebar">
            <div className="sidebar__avatar">
                <img src={user.avatarUrl || avatar} alt="Avatar do usuário" />
            </div>

            <Link to="/dashboard" className="sidebar__link">
                <FiHome color="aliceblue" size={24}/>    
                <span className="sidebar__link-texto">Chamados</span>
            </Link>

            <Link to="/customers" className="sidebar__link">
                <FiUser color="aliceblue" size={24}/>
                <span className="sidebar__link-texto">Clientes</span>   
            </Link>

            <Link to="/profile" className="sidebar__link">
                <FiSettings color="aliceblue" size={24}/> 
                <span className="sidebar__link-texto">Configurações</span>   
            </Link>
        </div>
    )
}