"use client";

import { Card } from "./Card";
import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";
import StoreContextProvider from "@/context/StoreContext";

export const Foods = () => {
  const response = useContext(StoreContext);
  return (
    <div className="max-w-screen-xl mx-auto">
      <StoreContextProvider>
        <Card />
      </StoreContextProvider>
    </div>
  );
};
