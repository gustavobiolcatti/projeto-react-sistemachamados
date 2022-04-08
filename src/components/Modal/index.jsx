import { FiX } from "react-icons/fi"

import "./style.css"

export default function Modal({conteudo, close}) {

    function chooseClass(status) {
        const classe = {
            "Aberto": "badge badge--aberto",
            "Progresso": "badge badge--progresso",
            "Atendido": "badge badge--atendido",
        }

        return classe[status]
    }

    return (
        <div className="modal">
            <div className="modal__container">
                <button className="close" onClick={() => close()}>
                    <FiX size={23} color="#FFF" />
                    Voltar
                </button>

                <div className="modal__content">
                    <h2 className="modal__titulo">Detalhes do chamado</h2>

                    <div className="row">
                        <span>Cliente: <i>{conteudo.cliente}</i></span>
                    </div>

                    <div className="row">
                        <span>Assunto: <i>{conteudo.assunto}</i></span>
                    </div>

                    <div className="row">
                        <span>Cadastrado em: <i>{conteudo.createdFormated}</i></span>
                    </div>

                    <div className="row">
                        <span>Status: <i className={chooseClass(conteudo.status)}>{conteudo.status}</i></span>
                    </div>

                    {conteudo.complemento !== "" && (
                        <div className="row">
                            <h3>Complemento</h3>
                            <p>
                                {conteudo.complemento}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}