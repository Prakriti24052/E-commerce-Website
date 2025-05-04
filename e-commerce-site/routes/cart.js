const express = require('express');
const router = express.Router();  // Use router instead of app
const Cart = require('../models/Cart');  // Assuming Cart model is in models/Cart.js

// Get cart by userId
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching cart' });
    }
});

// Add product to cart
router.post('/:userId', async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            const newCart = new Cart({
                userId: req.params.userId,
                products: [{ productId, quantity }],
                totalPrice: 0,
            });
            await newCart.save();
            return res.json(newCart);
        }

        const productExists = cart.products.find(item => item.productId.toString() === productId);
        if (productExists) {
            productExists.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error adding to cart' });
    }
});

// Remove product from cart
router.delete('/:userId/:productId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        cart.products = cart.products.filter(item => item.productId.toString() !== req.params.productId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error removing from cart' });
    }
});

module.exports = router;  // Make sure to export the router
