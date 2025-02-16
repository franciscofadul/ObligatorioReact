import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Registro from "../registro/registrarse";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;