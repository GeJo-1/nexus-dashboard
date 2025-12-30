const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (Replace with your local or Atlas URI)
mongoose.connect('mongodb+srv://admin:nexus123@nexus.hwh4m7x.mongodb.net/?appName=NEXUS')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Simple Product Schema
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    sales: Number,
    stock: Number
});
const Product = mongoose.model('Product', ProductSchema);

// Routes
app.get('/api/products', async (req, res) => {
    // For demo purposes, if empty, seed data
    const count = await Product.countDocuments();
    if (count === 0) {
        await Product.create([
            { name: "Neon CyberDeck", price: 1200, sales: 450, stock: 12 },
            { name: "Holo-Headset", price: 850, sales: 200, stock: 50 },
            { name: "Quantum Chip", price: 2999, sales: 80, stock: 5 }
        ]);
    }
    const products = await Product.find();
    res.json(products);
});

// Add a new product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Failed to save product" });
    }
});

// Delete a product (Bonus functionality)
app.delete('/api/products/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => console.log('Server running on port 5000'));