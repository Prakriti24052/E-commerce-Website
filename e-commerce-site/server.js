require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const session = require('express-session');
const connectDB = require('./db');          // MongoDB connection
const User = require('./models/User');      // Mongoose model
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');        // for secure token generation
const ProductRoutes = require('./routes/product'); // Import product routes
const CartRoutes = require('./routes/cart'); // Import cart routes
const OrderRoutes = require('./routes/order'); // Import order routes


const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // set to true if using HTTPS
    })
);

app.use('/products', ProductRoutes);
app.use('/cart', CartRoutes);
app.use('/orders', OrderRoutes);

// Password hashing function
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Generate JWT token for reset password link
function generateResetToken(email) {
    const payload = { email };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Send password reset email
function sendResetEmail(email, resetToken) {
    const resetLink = `http://localhost:${process.env.PORT || 3000}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        to: email,
        subject: 'Password Reset Request',
        text: `Click the following link to reset your password: ${resetLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Password reset email sent:', info.response);
        }
    });
}

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered. Please login instead.' });
        }

        const newUser = new User({
            name,
            email,
            password: hashPassword(password),
        });

        await newUser.save();

        res.json({ message: 'Registration successful! You can now login.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Email not registered. Please register first.' });
        }

        if (user.password !== hashPassword(password)) {
            return res.status(401).json({ error: 'Incorrect password. Please try again.' });
        }

        res.json({ message: 'Login successful! Redirecting...' });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// Forgot Password route
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'Email not found. Please register first.' });
        }

        const resetToken = generateResetToken(email);
        sendResetEmail(email, resetToken);

        res.json({ message: 'Password reset link has been sent to your email (simulated).' });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again.' });
    }
});

// Serve reset-password HTML
app.get('/reset-password/:token', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/reset-password.html'));
});

// Reset Password route
app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { email } = decoded;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        user.password = hashPassword(password);
        await user.save();

        res.json({ message: 'Password successfully reset! You can now login with your new password.' });
    } catch (error) {
        res.status(400).json({ error: 'Invalid or expired token.' });
    }
});

// Dashboard route
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
