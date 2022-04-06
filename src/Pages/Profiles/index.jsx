import Header from "../../components/Header"
import Title from "../../components/Title"
import { FiSettings } from "react-icons/fi"

import "./style.css"

export default function Profile() {
    return (
        <div>
            <Header />
            <div className="content">
                <Title name="Meu Perfil">
                    <FiSettings size={25} />
                </Title>
            </div>
        </div>
    )
}