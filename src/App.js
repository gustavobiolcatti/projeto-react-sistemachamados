import AuthProvider from "./contexts/auth";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Rotas from "./routes"

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
          <ToastContainer autoClose={5000} />
            <Rotas />
      </AuthProvider>
    </BrowserRouter>
  );
}
