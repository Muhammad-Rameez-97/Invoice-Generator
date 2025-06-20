// src/App.jsx
import React, { useEffect, useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import InvoiceSearch from "./components/InvoiceSearch";
import { getInvoices } from "./api";

function App() {
  const [invoices, setInvoices] = useState([]);

  const loadInvoices = async () => {
    const res = await getInvoices();
    setInvoices(res.data);
  };

  useEffect(() => {
    loadInvoices();
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Invoice Generator</h1>
      <InvoiceForm onInvoiceCreated={loadInvoices} />
      <InvoiceSearch />
      <InvoiceList invoices={invoices} refresh={loadInvoices} />
    </div>
  );
}

export default App;
