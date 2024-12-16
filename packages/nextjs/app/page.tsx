"use client";

import React, { useState } from "react";
import { useReadContract, useWriteContract } from "wagmi"; 
import { abi } from "./SimpleDEX.json"; 

const Home = () => {
  const [amountA, setAmountA] = useState("");
  const [amountB, setAmountB] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [tokenAPrice, setTokenAPrice] = useState("Cargando...");

  const contractAddress = "0x948B3c65b89DF0B4894ABE91E6D02FE579834F8F"; 

  // Leer el precio del token usando `useReadContract`
  const { data: priceData, isError: isReadError } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getPrice",
    args: ["TokenA"],
    onSuccess: (data) => setTokenAPrice(data.toString()),
    onError: () => setTokenAPrice("Error al obtener el precio"),
  });

  // Escribir funciones en el contrato
  const { write: addLiquidity } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "addLiquidity",
  });

  const { write: removeLiquidity } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "removeLiquidity",
  });

  const { write: swapAforB } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "swapAforB",
  });

  const { write: swapBforA } = useWriteContract({
    address: contractAddress,
    abi: abi,
    functionName: "swapBforA",
  });

  // Handlers para las acciones del usuario
  const handleAddLiquidity = async () => {
    try {
      await addLiquidity({ args: [amountA, amountB] });
      alert("Liquidez agregada con éxito");
    } catch (error) {
      console.error("Error al agregar liquidez:", error);
    }
  };

  const handleRemoveLiquidity = async () => {
    try {
      await removeLiquidity({ args: [amountA, amountB] });
      alert("Liquidez retirada con éxito");
    } catch (error) {
      console.error("Error al retirar liquidez:", error);
    }
  };

  const handleSwapAforB = async () => {
    try {
      await swapAforB({ args: [swapAmount] });
      alert("Intercambio completado");
    } catch (error) {
      console.error("Error en el intercambio:", error);
    }
  };

  const handleSwapBforA = async () => {
    try {
      await swapBforA({ args: [swapAmount] });
      alert("Intercambio completado");
    } catch (error) {
      console.error("Error en el intercambio:", error);
    }
  };

  return (
    <div>
      <h1>SimpleDEX</h1>
      <section>
        <h2>Precio del Token</h2>
        <p>Precio de Token A: {tokenAPrice}</p>
      </section>
      <section>
        <h2>Funciones</h2>
        <div>
          <h3>Agregar Liquidez</h3>
          <input
            type="text"
            placeholder="Cantidad Token A"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cantidad Token B"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
          />
          <button onClick={handleAddLiquidity}>Agregar Liquidez</button>
        </div>
        <div>
          <h3>Retirar Liquidez</h3>
          <input
            type="text"
            placeholder="Cantidad Token A"
            value={amountA}
            onChange={(e) => setAmountA(e.target.value)}
          />
          <input
            type="text"
            placeholder="Cantidad Token B"
            value={amountB}
            onChange={(e) => setAmountB(e.target.value)}
          />
          <button onClick={handleRemoveLiquidity}>Retirar Liquidez</button>
        </div>
        <div>
          <h3>Intercambiar Tokens</h3>
          <input
            type="text"
            placeholder="Cantidad a intercambiar"
            value={swapAmount}
            onChange={(e) => setSwapAmount(e.target.value)}
          />
          <button onClick={handleSwapAforB}>Intercambiar A por B</button>
          <button onClick={handleSwapBforA}>Intercambiar B por A</button>
        </div>
      </section>
    </div>
  );
};

export default Home;

