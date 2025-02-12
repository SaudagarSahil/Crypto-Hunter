import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../context/CryptoContext";
import CoinInfo from "../components/CoinInfo";

const Coin: React.FC = () => {
  const { coinSymbol } = useParams();

  // const { currency, symbol } = CryptoState();

  return (
    <div>
      <CoinInfo coinSymbol={coinSymbol} />
      
    </div>
  );
};

export default Coin;
