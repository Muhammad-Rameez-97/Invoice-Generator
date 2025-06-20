const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const XLSX = require('xlsx');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const filePath = './data.xlsx';

// Helper to load Excel data
function loadInvoices() {
    if (!fs.existsSync(filePath)) return [];
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    return XLSX.utils.sheet_to_json(sheet);
}

// Helper to save Excel data
function saveInvoices(data) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");
    XLSX.writeFile(workbook, filePath);
}

// Routes
app.get('/invoices', (req, res) => {
    res.json(loadInvoices());
});

app.post('/invoices', (req, res) => {
    const invoices = loadInvoices();
    const newInvoice = { ...req.body, invoiceNumber: Date.now().toString() };
    invoices.push(newInvoice);
    saveInvoices(invoices);
    res.json({ message: "Invoice added", invoice: newInvoice });
});

app.delete('/invoices/:invoiceNumber', (req, res) => {
    const invoices = loadInvoices();
    const updated = invoices.filter(inv => inv.invoiceNumber !== req.params.invoiceNumber);
    saveInvoices(updated);
    res.json({ message: "Deleted successfully" });
});

app.get('/invoices/search/:invoiceNumber', (req, res) => {
    const invoices = loadInvoices();
    const invoice = invoices.find(inv => inv.invoiceNumber === req.params.invoiceNumber);
    res.json(invoice || {});
});

app.patch('/invoices/:invoiceNumber', (req, res) => {
    const invoices = loadInvoices();
    const updated = invoices.map(inv =>
        inv.invoiceNumber === req.params.invoiceNumber
            ? { ...inv, status: req.body.status }
            : inv
    );
    saveInvoices(updated);
    res.json({ message: "Status updated" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
