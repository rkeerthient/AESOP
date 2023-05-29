import { createContext, useContext, useState } from "react";
import * as React from "react";

interface MyContextType {
  promoData: any;
  custLoad: boolean;
  setPromoData: React.Dispatch<React.SetStateAction<any>>;
  setCustLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

interface MyContextProviderProps {
  children: React.ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [promoData, setPromoData] = useState<[any]>();
  const [custLoad, setCustLoad] = useState<boolean>(false);

  return (
    <MyContext.Provider
      value={{ promoData, custLoad, setPromoData, setCustLoad }}
    >
      {children}
    </MyContext.Provider>
  );
};
