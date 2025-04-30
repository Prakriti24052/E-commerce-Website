const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const app = express();

// Initialize users database file if it doesn't exist
const usersFilePath = path.join(__dirname, 'users.json');
if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
}

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper function to read users
function readUsers() {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

// Helper function to write users
function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// Hash password function
function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

// Login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const users = readUsers();
    
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return res.status(401).json({ 
            error: 'Email not registered. Please register first.' 
        });
    }
    
    if (user.password !== hashPassword(password)) {
        return res.status(401).json({ 
            error: 'Incorrect password. Please try again.' 
        });
    }
    
    res.json({ 
        message: 'Login successful! Redirecting...' 
    });
});

// Register endpoint
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    const users = readUsers();
    
    // Check if user already exists
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ 
            error: 'Email already registered. Please login instead.' 
        });
    }
    
    // Add new user
    const newUser = {
        id: crypto.randomBytes(16).toString('hex'),
        name,
        email,
        password: hashPassword(password),
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    writeUsers(users);
    
    res.json({ 
        message: 'Registration successful! You can now login.' 
    });
});

// Forgot password endpoint
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    const users = readUsers();
    
    // Check if user exists
    if (!users.some(u => u.email === email)) {
        return res.status(404).json({ 
            error: 'Email not found. Please register first.' 
        });
    }
    
    // In a real app, we would send a password reset email here
    res.json({ 
        message: 'Password reset link has been sent to your email (simulated).' 
    });
});

// Dashboard route (protected)
app.get('/dashboard', (req, res) => {
    // In a real app, this would check for authentication
    res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});