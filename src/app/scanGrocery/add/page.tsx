"use client";
import React, { useState } from "react";
import { firestore } from "@/lib/firebase"; // Assuming you have a firebase config file
import { doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import toast, { toastConfig } from "react-simple-toasts";
import "react-simple-toasts/dist/theme/dark.css";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface e {
  name: string;
  quantity: number;
}
// Set toast theme
toastConfig({ theme: "dark" });

export default function AddPantryItemManually() {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState<number>(0);

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (!itemName || !quantity) {
      toast("Please fill in all fields.");
      return;
    }

    try {
      // Create a reference to the document
      const docRef = doc(firestore, "inventory", itemName);

      // Set the document data
      await setDoc(docRef, { name: itemName, quantity });

      // Show success message
      toast("Pantry item added successfully!");

      // Reset form fields
      setItemName("");
      setQuantity(0);
    } catch (error) {
      toast("Failed to add item. Try again.");
    }
  };

  return (
    <div className="flex justify-center my-10 p-10">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Хүнсний нэр гараар оруулах</CardTitle>
          <CardDescription>
            Хүнсний нэр болон тоо ширхэгийг оруулаад хадгалах, тэгээд буцах
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit} className="">
            <div className="grid w-full items-center gap-4 ">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Нэр</Label>
                <Input
                  type="text"
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Хүнсний нэр"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="quantity">Тоо Ширхэг</Label>
                <Input
                  type="number"
                  id="quantity"
                  min="0"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.valueAsNumber)}
                  placeholder="Quantity"
                />
              </div>
            </div>
            <CardFooter className="flex justify-between items-baseline  p-2 m-2">
              <Button variant="outline">
                <Link href="/scanGrocery">Буцах</Link>
              </Button>
              <Button type="submit">Хадгалах</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
