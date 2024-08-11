"use server";
import axios from "axios";

export async function getProductData(barcode: string) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  const response = await axios.get(url);

  if (response.data.status === 1) {
    return response.data.product;
  } else {
    throw new Error("Product not found");
  }
}
