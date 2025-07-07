"use client";

import { useEffect, useState } from "react";
import { fetchInitialPrice, subscribeToPrice } from "../lib/api";
import { BtcRealtimePrice } from "../types";

export default function BitcoinPrice() {
  const [price, setPrice] = useState<BtcRealtimePrice | null>(null);

  useEffect(() => {
    // Carrega o preço inicial
    const loadInitialPrice = async () => {
      try {
        const data = await fetchInitialPrice();
        if (data && data.price) {
          setPrice(data);
        }
      } catch (err) {
        console.error("Erro ao carregar preço inicial:", err);
      }
    };
    loadInitialPrice();

    // Subscreve atualizações em tempo real
    const unsubscribe = subscribeToPrice((newPrice) => {
      if (newPrice && newPrice.price) {
        setPrice(newPrice);
      } else {
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Preço do Bitcoin (BTC/USDT)</h1>
      <p className="text-lg">{price ? `${price.price} USDT` : "Carregando..."}</p>
      <p className="text-sm text-gray-500">
        {price ? `Atualizado em: ${new Date(price.timestamp).toLocaleTimeString()}` : ""}
      </p>
    </div>
  );
}
