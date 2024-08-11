"use server";

export async function getProductData(barcode: string) {
  const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Product not found");
  }

  const data = await response.json();

  if (data.status === 1) {
    return data.product;
  } else {
    throw new Error("Product not found");
  }
}
