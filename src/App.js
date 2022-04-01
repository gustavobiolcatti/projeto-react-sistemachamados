import { BrowserRouter } from "react-router-dom";
import Rotas from "./routes"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </div>
  );
}
