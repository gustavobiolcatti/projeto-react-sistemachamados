import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/auth";

export default function PrivateOutlet() {

  const { signed, user } = useContext(AuthContext)

  console.log(user)

  return signed ? <Outlet /> : <Navigate to="/" />
} 
  