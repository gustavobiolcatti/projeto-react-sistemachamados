import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateOutlet from "./PrivateOutlet";
import WatchLogin from "./WatchLogin";

import SignIn from "../Pages/Signin"
import SignUp from "../Pages/Signup"
import Profile from "../Pages/Profiles"

const Dashboard = lazy(() => import("../Pages/Dashboard"))

export default function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<WatchLogin />}>
                <Route path="/" element={<SignIn />} />
            </Route>

            <Route path="/" element={<WatchLogin />}>
                <Route path="/register" element={<SignUp />} />   
            </Route>

            <Route path="/dashboard" element={<PrivateOutlet />}>
                <Route path="/dashboard" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                } />
            </Route>

            <Route path="/profile" element={<Profile />} /> 
        </Routes>
    )
}