// pages/index.tsx
"use client";
import React, { useState } from "react";
import BarcodeScanner from "@/components/barCodeScanner";
import { getProductData } from "@/lib/server/product"; // Assuming the path is correct
import { Button } from "@/components/ui/button";
interface Product {
  product_name: string;
  brands: string;
  categories: string;
  image_url: string;
}

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleScan = async (barcode: string): Promise<void> => {
    try {
      const fetchedProduct = await getProductData(barcode);
      setProduct(fetchedProduct);
      setError(null);
      console.log(fetchedProduct);
    } catch (err: any) {
      console.log(err);
      setProduct(null);
      setError(
        err.response?.data?.error || "Failed to fetch product information"
      );
    }
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>
        <h1>Scan a Barcode</h1>
      </Button>

      {open && <BarcodeScanner onScan={handleScan} />}
      {product && (
        <div className="text-black">
          <h2>{product.product_name}</h2>
          <p>{product.brands}</p>
          <p>{product.categories}</p>
          <img src={product.image_url} alt={product.product_name} />
        </div>
      )}
      {/* {<Button
        onClick={() => {
          setOpen(false);
          setProduct(null);
          setError(null);
        }}
      >
        Looks good! Scan another
      </Button>} */}
    </div>
  );
}
