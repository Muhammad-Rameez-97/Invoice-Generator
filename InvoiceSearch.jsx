// src/components/InvoiceSearch.jsx
import React, { useState } from "react";
import { searchInvoice } from "../api";

function InvoiceSearch() {
  const [searchId, setSearchId] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = async () => {
    try {
      const res = await searchInvoice(searchId);
      if (res.data && res.data.invoiceNumber) {
        setResult(res.data);
        setNotFound(false);
      } else {
        setResult(null);
        setNotFound(true);
      }
    } catch (err) {
      console.error(err);
      setResult(null);
      setNotFound(true);
    }
  };

  return (
    <div style={{ marginBottom: "2rem" }}>
      <h3>🔍 Search Invoice</h3>
      <input
        placeholder="Enter Invoice Number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {result && (
        <div
          style={{
            marginTop: "1rem",
            border: "1px solid #ccc",
            padding: "1rem",
          }}
        >
          <p>
            <strong>Invoice #: </strong>
            {result.invoiceNumber}
          </p>
          <p>
            <strong>Customer:</strong> {result.customer}
          </p>
          <p>
            <strong>Product:</strong> {result.product}
          </p>
          <p>
            <strong>Quantity:</strong> {result.qty}
          </p>
          <p>
            <strong>Price:</strong> Rs.{result.price}
          </p>
          <p>
            <strong>Total Amount:</strong> Rs.{result.amount}
          </p>
          <p>
            <strong>Status:</strong>
            <span style={{ color: result.status === "Paid" ? "green" : "red" }}>
              {" "}
              {result.status}
            </span>
          </p>
        </div>
      )}

      {notFound && (
        <p style={{ color: "red", marginTop: "1rem" }}>⚠️ Invoice not found.</p>
      )}
    </div>
  );
}

export default InvoiceSearch;
