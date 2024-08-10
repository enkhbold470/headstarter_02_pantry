"use client"
import React, { useState, useEffect } from "react"
import { firestore } from '@/lib/firebase'

import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore'



export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [inventory, setInventory] = useState([])
  const [itemName, setItemName] = useState('')

  const [formSuccess, setFormSuccess] = useState(false)
  const [formSuccessMessage, setFormSuccessMessage] = useState("")

  const handleInput = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue
    }));
  }

  const submitForm = (e) => {
    // We don't want the page to refresh
    e.preventDefault()

    const formURL = e.target.action
    const data = new FormData()

    // Turn our formData state into data we can use with a form submission
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    })

    // POST the data to the URL of the form
    fetch(formURL, {
      method: "POST",
      body: data,
      headers: {
        'accept': 'application/json',
      },
    }).then((response) => response.json())
      .then((data) => {
        setFormData({
          name: "",
          email: "",
          message: ""
        })

        setFormSuccess(true)
        setFormSuccessMessage(data.submission_text)
      })
  }

  // use effect for firebase
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() })
    })
    setInventory(inventoryList)
  }

  useEffect(() => {
    updateInventory()
  }, [])
  // add item to inventory
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }
  return (
    <div>
      <h1>Contact form</h1>
      {formSuccess ?
        <div>{formSuccessMessage}</div>
        :
        <form method="POST" action="/api/" onSubmit={submitForm}>
          <div>
            <label>Name</label>
            <input type="text" name="name" onChange={handleInput} value={formData.name} />
          </div>

          <div>
            <label>Email</label>
            <input type="text" name="email" onChange={handleInput} value={formData.email} />
          </div>

          <div>
            <label>Message</label>
            <textarea name="message" onChange={handleInput} value={formData.message}></textarea>
          </div>

          <button type="submit">Send message</button>
        </form>
      }
    </div>
  )
}