import { useState, useEffect, createContext } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";


export const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    function loadStorage() {
        const userStorage = localStorage.getItem("sistema")

        if (userStorage) setUser(JSON.parse(userStorage))

        setLoading(false)
    }

    async function signUp(name, email, password) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredencial) => {
                alert("Cadastro realizado", userCredencial.user.email)

                let uid = userCredencial.user.uid

                await setDoc(doc(db, "users", uid), {
                    nome: name,
                    avatarUrl: null
                })
                .then(() => {
                    let data = {
                        uid,
                        name,
                        email: userCredencial.user.email,
                        avatar: null
                    }

                    setUser(data)
                    storageUser(data)
                })
                .catch((error) => {
                    if (error.code === "auth/invalid-email") {
                        alert("Email inválido")
                    }
                    else if ("auth/email-already-in-use") {
                        alert("Email já cadastrado")
                    }

                    console.log("Erro no cadastro", error.code)
                })
                .finally(() => {
                    setLoadingAuth(false)
                })
            })
            
    }

    function storageUser(data) {
        const userStringfy = JSON.stringify(data)
        localStorage.setItem("sistema", userStringfy)
    }

    useEffect(() => {loadStorage()}, [])

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, loadingAuth, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}