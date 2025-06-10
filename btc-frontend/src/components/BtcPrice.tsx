"use client";

import { useEffect, useState } from "react";

export default function BtcPrice() {
  const [price, setPrice] = useState<string | null>("");

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        );
        const data = await res.json();
        setPrice(
          parseFloat(data.price).toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })
        );
        console.log(data);
      } catch (error) {
        console.error("Erro ao buscar o preço do bitcoin", error);
        setPrice(null);
      }
    };
    fetchPrice();

    const interval = setInterval(fetchPrice, 5000);
    return () => clearInterval(interval);
  }, []);

  return <span className="flex items-center bg-amber-800">{price && "Preço do Bitcoin: " + price}</span>;
}
