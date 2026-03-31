"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Card } from "./ui/card";
import { useState, useEffect } from "react";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000); // Corrected parenthesis here

    return () => clearInterval(interval);
  }, [products.length]);

  if (products.length === 0) return null;

  const currentProduct = products[current];

  // Note: Ensure you used 'expand: ["data.default_price"]' in your Stripe fetch
  // otherwise this cast will fail at runtime.
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card className="relative overflow-hidden w-full h-[400px]">
      {currentProduct.images?.[0] && (
        <div className="relative w-full h-full">
          <Image
            alt={currentProduct.name}
            src={currentProduct.images[0]}
            fill // Modern replacement for layout="fill"
            className="object-cover transition-opacity duration-500" // Modern replacement for objectFit
            priority={current === 0} // Optimizes loading for the first slide
          />

          {/* Optional: Add a text overlay since you have the price/name */}
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4 text-white">
            <h3 className="font-bold">{currentProduct.name}</h3>
            {price?.unit_amount && (
              <p>${(price.unit_amount / 100).toFixed(2)}</p>
            )}
          </div>
        </div>
      )}
    </Card>
  );
};
