import { useContext } from "react"
import { AuthContext } from "../../contexts/auth"

export default function Dashboard() {

    const { logout } = useContext(AuthContext)

    function handleLogout() {
        logout()
    }

    return (
        <>
            <h1>Dashboard</h1>

            <button onClick={() => {handleLogout()}}>Sair</button>
        </>
    )
}
