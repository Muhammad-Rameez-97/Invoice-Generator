// src/components/InvoiceList.jsx
import React from "react";
import { deleteInvoice, updateStatus } from "../api";

function InvoiceList({ invoices, refresh }) {
  const handleDelete = async (invoiceNumber) => {
    await deleteInvoice(invoiceNumber);
    refresh();
  };

  const toggleStatus = async (invoiceNumber, currentStatus) => {
    const newStatus = currentStatus === "Paid" ? "Unpaid" : "Paid";
    await updateStatus(invoiceNumber, newStatus);
    refresh();
  };

  return (
    <div>
      <h2>📋 All Invoices</h2>
      {invoices.length === 0 ? (
        <p>No invoices available.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          cellSpacing="0"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
              <th>Mark Paid/Unpaid</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.invoiceNumber}>
                <td>{inv.invoiceNumber}</td>
                <td>{inv.customer}</td>
                <td>{inv.product}</td>
                <td>{inv.qty}</td>
                <td>Rs.{inv.price}</td>
                <td>Rs.{inv.amount}</td>
                <td style={{ color: inv.status === "Paid" ? "green" : "red" }}>
                  {inv.status}
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(inv.invoiceNumber, inv.status)}
                  >
                    Toggle
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(inv.invoiceNumber)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default InvoiceList;
