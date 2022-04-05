import { useState, useEffect, createContext, useCallback } from "react";
import { auth, db } from "../services/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


export const AuthContext = createContext({})

export default function AuthProvider({children}) {

    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    const loadStorage = useCallback(()=> {
        const userStorage = localStorage.getItem("sistema")

        if (userStorage) {
            setUser(JSON.parse(userStorage))
            console.log("Dados restaurados")
            navigate("/dashboard")
        }
        setLoading(false)
    }, [navigate])

    async function signUp(name, email, password) {
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredencial) => {
                toast.success("Cadastro realizado", userCredencial.user.email)

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
                        toast.error("Email inválido")
                    }
                    else if ("auth/email-already-in-use") {
                        toast.error("Email já cadastrado")
                    }

                    console.log("Erro no cadastro", error.code)
                })
                .finally(() => {
                    setLoadingAuth(false)
                })
            })
            
    }

    async function signIn(email, password) {
        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredencial) => {
                
                const  {user: { uid }} = userCredencial
                
                await getDoc(doc(db, "users", uid))
                    .then((userInfo) => {
                        const userInfoData = userInfo.data()

                        const data = {
                            uid,
                            name: userInfoData.nome,
                            email,
                            avatar: userInfoData.avatarUrl
                        }

                        setUser(data)
                        storageUser(data)
                    })
                    .catch((err) => {
                        toast.error("Erro ao acessar os dados do usuário")
                        console.log(err)
                    })
                
                toast.success("Login realizado", userCredencial.user.email)
            })
            .catch((error) => {
                toast.error("Erro no login", error.code)
            })
            .finally(() => {
                setLoadingAuth(false)
            })
    }

    async function logout() {
        signOut(auth).then(() => {
            toast("Usuário deslogado")
            localStorage.removeItem("sistema")
            setUser(null)
        })
    }

    function storageUser(data) {
        const userStringfy = JSON.stringify(data)
        localStorage.setItem("sistema", userStringfy)
        console.log("Dados salvos")
    }

    useEffect(() => {loadStorage()}, [loadStorage])

    useEffect(() => {
        if (user) {
            navigate("/dashboard")
        }
    }, [navigate, user])

    return (
        <AuthContext.Provider value={{signed: !!user, user, loading, loadingAuth, signUp, signIn, logout}}>
            {children}
        </AuthContext.Provider>
    )
}