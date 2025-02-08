import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CryptoContextType {
  currency: string;
  symbol: string;
  setCurrency: (currency: string) => void;
}

interface CryptoProviderType {
  children: ReactNode;
}

const Crypto = createContext<CryptoContextType | undefined>(undefined);

const CryptoContext: React.FC<CryptoProviderType> = ({ children }) => {
  const [currency, setCurrency] = useState<string>("INR");
  const [symbol, setSymbol] = useState<string>("₹");

  useEffect(() => {
    if (currency == "INR") setSymbol("₹");
    else if (currency == "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, symbol, setCurrency }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = (): CryptoContextType => {
  const context = useContext(Crypto);
  if (!context) {
    throw new Error("CryptoState must be used within a CryptoContext Provider");
  }
  return context;
};
