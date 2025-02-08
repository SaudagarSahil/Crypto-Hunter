import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Homepage from "./pages/Homepage";
import Coin from "./pages/Coin";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/coins/:id" element={<Coin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
