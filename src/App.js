import AuthProvider from "./contexts/auth";

import { BrowserRouter } from "react-router-dom";

import Rotas from "./routes"

export default function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Rotas />
        </BrowserRouter>
      </AuthProvider>
  );
}
