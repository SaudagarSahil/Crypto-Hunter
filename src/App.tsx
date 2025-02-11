import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./pages/Header";
import Homepage from "./pages/Homepage";
import Coin from "./pages/Coin";
import CryptoContext from "./context/CryptoContext";

const App: React.FC = () => {
  return (
    <CryptoContext>
      <BrowserRouter>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:coinSymbol" element={<Coin />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CryptoContext>
  );
};

export default App;
