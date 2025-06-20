// src/components/InvoiceForm.jsx
import React, { useState } from "react";
import { createInvoice } from "../api";

function InvoiceForm({ onInvoiceCreated }) {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer || !product || !qty || !price) {
      alert("Please fill in all fields");
      return;
    }

    const amount = parseInt(qty) * parseFloat(price);
    const invoice = {
      customer,
      product,
      qty: parseInt(qty),
      price: parseFloat(price),
      amount,
      status: "Unpaid",
    };

    await createInvoice(invoice);
    onInvoiceCreated();

    // Clear form
    setCustomer("");
    setProduct("");
    setQty("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <h3>Create New Invoice</h3>
      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
      />
      <input
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        placeholder="Quantity"
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <input
        placeholder="Price per unit"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button type="submit">Create Invoice</button>
    </form>
  );
}

export default InvoiceForm;
