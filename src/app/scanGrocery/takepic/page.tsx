"use client";
import React, { useState, useEffect } from "react";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  query,
  getDoc,
} from "firebase/firestore";
import BarcodeScanner from "@/components/barCodeScanner";
import { getProductData } from "@/lib/server/product";
import { firestore } from "@/lib/firebase"; // Assuming you have a firebase config file
import { Button } from "@/components/ui/button";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";

import Link from "next/link";
interface Product {
  product_name: string;
  brands: string;
  categories: string;
  image_url: string;
}
toastConfig({ theme: "dark" });

export default function Home() {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanHandled, setScanHandled] = useState<boolean>(false); // Track if scan is handled

  const [inventory, setInventory] = useState<any[]>([]);

  const handleScan = async (barcode: string): Promise<void> => {
    if (scanHandled) return; // Prevent duplicate scan handling

    setScanHandled(true); // Mark the scan as handled

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

  const handleSaveToFirestore = async (): Promise<void> => {
    if (!product) return;

    const docRef = doc(
      collection(firestore, "inventory"),
      product.product_name
    );
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList: any = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  return (
    <div className="border flex flex-col gap-2 items-center">
      <Button
        onClick={() => {
          setScanning(!scanning);
        }}
      >
        {scanning ? "Stop Scanning" : "Start Scanning"}
      </Button>
      <Button>
        {!scanning ? "Waiting..." : <Link href="/scanGrocery"> Go back</Link>}
      </Button>

      {scanning && <BarcodeScanner onScan={handleScan} />}
      {product && (
        <>
          <div className="dark:text-white">
            <h2>{product.product_name}</h2>
            <p>{product.brands}</p>
            <p>{product.categories}</p>
            <img src={product.image_url} alt={product.product_name} />
          </div>
          <Button
            onClick={() => {
              handleSaveToFirestore();
              toast("Хүнс амжилттай хадгалагдлаа🍞");
              setProduct(null);
              setScanHandled(false);
              setScanning(false);
            }}
          >
            Save to Firestore
          </Button>
        </>
      )}
      {error && (
        <p style={{ color: "red" }}>{`Scan grocery items! ${error}`}</p>
      )}
    </div>
  );
}
