const express = require('express');
const router = express.Router();  // Use router instead of app
const Order = require('../models/Order');  // Assuming you have an Order model

// Create Order (Place Order)
router.post('/:userId', async (req, res) => {
    const { products, totalPrice, status } = req.body;
    try {
        const newOrder = new Order({
            userId: req.params.userId,
            products,
            totalPrice,
            status: status || 'Pending',
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: 'Error placing order' });
    }
});

// Get Orders by User ID
router.get('/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId });
        if (!orders.length) {
            return res.status(404).json({ error: 'No orders found for this user' });
        }
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

// Update Order Status
router.put('/:orderId', async (req, res) => {
    const { status } = req.body;
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.orderId,
            { status },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order status updated', order });
    } catch (error) {
        res.status(500).json({ error: 'Error updating order status' });
    }
});

// Delete Order
router.delete('/:orderId', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting order' });
    }
});

module.exports = router;  // Export the router
