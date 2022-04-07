import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/auth"
import { collection, getDocs, addDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { toast } from "react-toastify"

import { FiPlusCircle } from "react-icons/fi"
import loading from "../../assets/img/loading.gif"

import Header from "../../components/Header"
import Title from "../../components/Title"

import "./style.css"

export default function New() {

    const [customerSelected, setCustomerSelected] = useState(0)
    const [assunto, setAssunto] = useState("Suporte")
    const [status, setStatus] = useState("Aberto")
    const [complemento, setComplemento] = useState("")

    const [customers, setCustomers] = useState([])
    const [loadCustomers, setLoadCustomers] = useState(true)
    const [loadInsertChamados, setLoadInsertChamados] = useState(false)
    
    const { user: { uid } } = useContext(AuthContext)

    async function handleRegister(e) {
        e.preventDefault()
        setLoadInsertChamados(true)

        addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto,
            status,
            complemento,
            userUid: uid
        })
        .then(() => {
            toast.success("Chamado registrado!")
        })
        .catch((error) => {
            toast.error("Erro ao registrar chamado")
            console.log(error)
        })
        .finally(() => {
            setLoadInsertChamados(false)
        })
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
                    <label>Cliente</label>

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
                    <select value={assunto} onChange={handleChangeSelect}>
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
                    
                    {loadInsertChamados ?
                        <button type="submit" className="chamados__botao" disabled={true}><img src={loading} alt="Loading" className="loading" /></button>
                    :
                        <button type="submit" className="chamados__botao">Registrar</button>
                    }
                    
                </form>
            </div>
        </div>
        </>
    )
}