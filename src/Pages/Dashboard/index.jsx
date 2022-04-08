import { useState, useEffect } from "react"
import { query, orderBy, limit, collection, getDocs, startAfter } from "firebase/firestore"
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi"
import { Link } from "react-router-dom"
import { db } from "../../services/firebaseConnection"
import { toast } from "react-toastify"
import { format } from "date-fns/esm"

import Header from "../../components/Header"
import Title from "../../components/Title"

import "./style.css"

export default function Dashboard() {

    const [chamados, setChamados] = useState([])
    const [lastDocs, setLastDocs] = useState("")
    const [isEmpty, setIsEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    
    const first = query(collection(db, "chamados"), orderBy("created", "desc"), limit(5))

    const loadChamados = async () => {
        await getDocs(first)
            .then((snapshot) => {
                updateState(snapshot.docs)
            })
            .catch((error) => {
                toast.error("Erro ao carregar chamados")
                console.log(error)
            })
    }

    async function updateState(snapshot) {
        const isCollectionEmpty = snapshot.length === 0

        if (!isCollectionEmpty) {
            const lista= []

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(), "dd/MM/yyyy"),
                    status: doc.data().status,
                    complemento: doc.data().complemento
                })
            });

            const lastDoc = snapshot[snapshot.length - 1]

            setChamados(chamados => [...chamados, ...lista])
            setLastDocs(lastDoc)
        }
        else {
            setIsEmpty(true)
        }

        setLoading(false)
    }
    
    async function handleMore() {
        setLoadingMore(true)

        const showAfter = query(collection(db, "chamados"), orderBy("created"), startAfter(lastDocs), limit(5))
        
        await getDocs(showAfter)
            .then((snapshot) => {
                updateState(snapshot.docs)
            })
            .catch((error) => {
                toast.error("Erro ao carregar mais chamados")
                console.log(error)
            })
            .finally(() => {
                setLoadingMore(false)
            })
    }
    
    function chooseClass(status) {
        const classe = {
            "Aberto": "badge badge--aberto",
            "Progresso": "badge badge--progresso",
            "Atendido": "badge badge--atendido",
        }

        return classe[status]
    }


    useEffect(() => {
        loadChamados()

        return () => {

        }
    }, [])

    if (loading) {
        return (
            <>  
            <Header />

            <div className="content">
                <Title name="Chamados">
                    <FiMessageSquare size={25} />
                </Title>

                
                <div className="dashboard">
                    <span>Buscando chamados...</span>
                </div>
                
            </div>
        </>
        )
    }

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
                        <Link to="/new" className="novo novo--tabela">
                            <FiPlus color="#FFF" size={25} />
                            Novo Chamado
                        </Link>

                        <table className="tabela-chamados">
                            <thead>
                                <tr className=" tabela-chamados__linha tabela-chamados__linha--cabecalho" >
                                    <th scope="col">Cliente</th>
                                    <th scope="col">Assunto</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cadastrado em</th>
                                    <th scope="col">#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {chamados.map((item, index) => {
                                    return (
                                        <tr key={index} className="tabela-chamados__linha">
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className={chooseClass(item.status)}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td data-label="Cadastrado em">{item.createdFormated}</td>
                                            <td data-label="#">
                                                <button className="action action--search">
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <button className="action action--edit">
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })
                                }
                            </tbody>
                        </table>

                        {loadingMore && <h3 style={{textAlign: "center", marginTop: 15}}>Buscando chamados...</h3>}

                        {!loadingMore && !isEmpty && <button className="botao-mais" onClick={handleMore}>Buscar mais</button>}
                    </div>
                }
            </div>
        </>
    )
}
