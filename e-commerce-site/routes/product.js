const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Create Product
router.post('/', async (req, res) => {
    const { name, description, price, category, imageUrl, stock } = req.body;
    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
        });
        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        res.status(500).json({ error: 'Error creating product' });
    }
});

// Get All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching products' });
    }
});

// Get Single Product
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product' });
    }
});

// Update Product
router.put('/:id', async (req, res) => {
    const { name, description, price, category, imageUrl, stock } = req.body;
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
        }, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product updated successfully', product });
    } catch (error) {
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Delete Product
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting product' });
    }
});

module.exports = router;


