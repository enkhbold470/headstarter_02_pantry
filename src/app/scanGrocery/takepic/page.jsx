// pages/index.js
"use client";
import React, { useState } from 'react';
import BarcodeScanner from '@/components/barCodeScanner';
import axios from 'axios';

export default function Home() {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (barcode) => {
    try {
      const response = await axios.get(`/lib/server/product`, {
        params: { barcode }
      });
      setProduct(response.data);
      setError(null);
    } catch (err) {
      console.log(err);
      setProduct(null);
      setError(err.response?.data?.error || 'Failed to fetch product information');

    }
  };

  return (
    <div>
      <h1>Scan a Barcode</h1>
      <BarcodeScanner onScan={handleScan} />
      {product && (
        <div>
          <h2>Product Information</h2>
          <p><strong>Name:</strong> {product.product_name}</p>
          <p><strong>Ingredients:</strong> {product.ingredients_text}</p>
          <p><strong>Nutritional Information:</strong> {JSON.stringify(product.nutriments)}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
