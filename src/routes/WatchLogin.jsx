import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from "../contexts/auth"

export default function WatchLogin() {

    const { signed } = useContext(AuthContext)

    return signed ? <Navigate to="/dashboard" /> : <Outlet />
}