import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"

import Header from "../../components/Header"
import Title from "../../components/Title"

import { FiPlusCircle } from "react-icons/fi"

import "./style.css"
import { toast } from "react-toastify"

export default function New() {

    const [customerSelected, setCustomerSelected] = useState(0)
    const [assunto, setAssunto] = useState("Suporte")
    const [status, setStatus] = useState("Aberto")
    const [complemento, setComplemento] = useState("")

    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomers] = useState(true)
    
    const { user } = useContext(AuthContext)

    async function handleRegister(e) {
        return (
            e.preventDefault()
        )
    }

    function handleChangeSelect(e) {
        setAssunto(e.target.value)
    }

    function handleOptionChange(e) {
        setStatus(e.target.value)
    }

    function handleChangeCustomers(e) {
        e.preventDefault()

        setCustomerSelected(e.target.value)
    }

    useEffect(() => {
        async function loadCustomers() {
            await getDocs(collection(db, "customers"))
                .then((snapshot) => {
                    const lista = []

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            nomeFantasia: doc.data().nomeFantasia
                        })

                        if (lista.length === 0) {
                            toast.warning("Nenhuma empresa encontrada")
                            setCustomers([ {id: "1", nomeFantasia: "Freela"} ])    
                            return
                        }
                    })
                    setCustomers(lista)
                })
                .catch((error) => {
                    toast.error("Erro ao carregar clientes")
                    console.log(error)
                })
                .finally(() => {
                    setLoadCustomers(false)
                })

           
        }

        loadCustomers()
    }, [])

    return (
        <>
        <Header />

        <div className="content">
            <Title name="Novo Chamado">
                <FiPlusCircle size={25} />
            </Title>

            <div className="chamados">
                <form className="chamados__form" onSubmit={handleRegister}>
                    <label>Cliente - {customerSelected}</label>

                    {loadCustomers ?
                        <input type="text" disabled={true} value="Carregando clientes..." />
                    :
                        <select value={customerSelected} onChange={handleChangeCustomers}>
                            {customers.map((customer, index) => {
                                return <option key={customer.id} value={index}>{customer.nomeFantasia}</option>
                            })}
                        </select>
                    }
                    

                    <label>Assunto</label>
                    <select value={assunto} onChange={handleChangeSelect} >
                        <option value="Suporte">Suporte</option>
                        <option value="Visita Técnica">Visita Técnica</option>
                        <option value="Financeiro">Financeiro</option>
                    </select>

                    <label>Status</label>
                    <fieldset className="chamados__status">                        
                        <label><input type="radio" name="radio" value="Aberto" className="chamados__radio" checked={status === "Aberto"} onChange={handleOptionChange} /> Em Aberto</label>

                        <label><input type="radio" name="radio" value="Progresso" className="chamados__radio" checked={status === "Progresso"} onChange={handleOptionChange} /> Progresso</label>

                        <label><input type="radio" name="radio" value="Atendido" className="chamados__radio" checked={status === "Atendido"} onChange={handleOptionChange} /> Atendido</label>
                    </fieldset>

                    <label>Complemento</label>
                    <textarea type="text" placeholder="Descreva seu problema (opcional)..." value={complemento} onChange={(e) => {setComplemento(e.target.value)}} />

                    <button type="submit" className="chamados__botao">Adicionar</button>
                </form>
            </div>
        </div>
        </>
    )
}