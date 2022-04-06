import { AuthContext } from "../../contexts/auth"
import { useContext, useState } from "react"
import { FiSettings, FiUpload } from "react-icons/fi"
import { db, auth } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";

import Header from "../../components/Header"
import Title from "../../components/Title"

import avatar from "../../assets/img/avatar.png"

import "./style.css"
import { toast } from "react-toastify";

export default function Profile() {

    const { user, setUser, storageUser, setLoading } = useContext(AuthContext)

    const [nome, setNome] = useState(user && user.name)
    const [email, setEmail] = useState(user && user.email)
    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
    const [imageAvatar, setImageAvatar] = useState(null)

    function handleFile(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0]
            
            if (image.type === "image/jpeg" || image.type === "image/png") {
                setImageAvatar(image)

                const urlImage = URL.createObjectURL(imageAvatar)
                setAvatarUrl(urlImage)

                console.log(imageAvatar)
                console.log(avatarUrl)
            }
            else {
                toast.error("Envie uma imagem PNG ou JPEG")
            }
        }
        console.log(e.target.files[0])
    }

    async function handleSave(e) {
        e.preventDefault()

        setLoading(true)

        if (imageAvatar === null && nome !== "") {
            const docRef = doc(db, "users", user.uid)

            await updateDoc(docRef, { nome: nome })
                .then(() => {
                    toast.success("Nome alterado!")

                    const data = { ...user, nome: nome }

                    setUser(data)
                    storageUser(data)
                })
                .catch((error) => {
                    toast.error("Erro ao alterar o nome")
                    console.log(error)
                })
        }
        else if (imageAvatar !== null && nome !== "") {
            handleUpload()
        }
    }

    async function handleUpload() {
        const currentUser = user.uid
    }

    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Meu Perfil">
                    <FiSettings size={25} />
                </Title>

                <div className="profile">
                    <form className="profile__form">
                        <label className="profile__avatar" onSubmit={(e) => {handleSave(e)}}>
                            <span>
                                <FiUpload color="#FFF" size={25} />
                            </span>

                            <div>
                                <input type="file" accept="image/*" onChange={(e) => handleFile(e)} /> 
                            </div>

                            <img src={avatarUrl === null || avatar} alt="Avatar do usuário" width="250" height="250" />
                        </label>

                        <label>Nome</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="profile__input" />

                        <label>E-mail</label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} disabled={true} className="profile__input" />

                        <button type="submit" className="profile__botao">Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}