import { useState, useContext } from "react"
import { addDoc, collection } from "firebase/firestore"
import { AuthContext } from "../../contexts/auth"
import { toast } from "react-toastify"
import { FiUser } from "react-icons/fi"

import Header from "../../components/Header"
import Title from "../../components/Title"

import "./style.css"
import { db } from "../../services/firebaseConnection"

export default function Customer() {

    const [nomeFantasia, setNomeFantasia] = useState("")
    const [cnpj, setCnpj] = useState("")
    const [endereco, setEndereco] = useState("")

    const { setLoading } = useContext(AuthContext)

    async function handleAdd(e) {
        e.preventDefault()

        if (nomeFantasia !== "" && cnpj !== "" && endereco !== "") {
            setLoading(true)

            await addDoc(collection(db, "customers"), {
                nomeFantasia: nomeFantasia,
                cnpj: cnpj,
                endereco: endereco
            })
            .then(() => {
                setNomeFantasia("")
                setCnpj("")
                setEndereco("")

                toast.success("Empresa adicionada com sucesso")
            })
            .catch((error) => {
                toast.error("Erro ao adicionar empresa")
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <div>
            <Header />
            
            <div className="content">
                <Title name="Clientes">
                    <FiUser size={25} />
                </Title>

                <div className="customers">
                    <form className="customers__form" onSubmit={handleAdd}>
                        <label>Nome Fantasia</label>
                        <input type="text" placeholder="Nome da empresa" value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} className="customers__input" />

                        <label>CNPJ</label>
                        <input type="text" placeholder="XX.XXX.XXX/XXXX-XX" value={cnpj} onChange={(e) => setCnpj(e.target.value)} className="customers__input" />

                        <label>Endereço</label>
                        <input type="text" placeholder="Endereço da Empresa" value={endereco} onChange={(e) => setEndereco(e.target.value)} className="customers__input" />

                        <button type="submit" className="customers__botao">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}