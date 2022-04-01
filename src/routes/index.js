import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import PrivateOutlet from "./PrivateOutlet";

import SignIn from "../Pages/Signin"

const Dashboard = lazy(() => import("../Pages/Dashboard"))

export default function Rotas() {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />

            <Route path="/dashboard" element={<PrivateOutlet />}>
                <Route path="/dashboard" element={
                    <Suspense fallback={<div>Loading...</div>}>
                        <Dashboard />
                    </Suspense>
                } />
            </Route>
        </Routes>
    )
}