import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateOutlet() {
    
    const signed = true
    
    return signed ? <Outlet /> : <Navigate to="/" />
  }
  