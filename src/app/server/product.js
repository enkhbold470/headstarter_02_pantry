"use server";
import axios from "axios";

export default async function handler(req, res) {
  const { barcode } = req.query;

  if (!barcode) {
    return res.status(400).json({ error: "Barcode is required" });
  }

  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    const response = await axios.get(url);

    if (response.data.status === 1) {
      return res.status(200).json(response.data.product);
    } else {
      return res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to fetch product information" });
  }
}
