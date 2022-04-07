import { useState } from "react"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"

import Header from "../../components/Header"
import Title from "../../components/Title"

import "./style.css"

export default function Dashboard() {

    const [chamados, setChamados] = useState([])

    return (
        <>  
            <Header />

            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>

                {
                    chamados.length === 0 ?

                    <div className="dashboard">
                        <span>Nenhum chamado registrado...</span>

                        <Link to="/new" className="novo">
                            <FiPlus color="#FFF" size={25} />
                            Novo Chamado
                        </Link>
                    </div>
                    :
                    <div>
                        <table className="chamados">
                            <thead>
                                <tr className=" chamados__linha chamados__linha--cabecalho" >
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="chamados__linha">
                                    <td data-label="Cliente">Sujeito</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge">Em aberto</span>
                                    </td>
                                    <td data-label="Cadastrado em">07/04/2022</td>
                                    <td data-label="#">
                                        <button className="action action--search">
                                            <FiSearch color="#FFF" size={17} />
                                        </button>
                                        <button className="action action--edit">
                                            <FiEdit2 color="#FFF" size={17} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                }
            </div>
        </>
    )
}
