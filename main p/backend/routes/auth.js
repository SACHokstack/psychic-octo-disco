const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const router = express.Router();
const db = new sqlite3.Database('./db/users.db');

// Sign Up
router.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(query, [username, hashedPassword], (err) => {
        if (err) {
            return res.status(500).json({ message: 'User already exists or another error occurred' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

// Sign In
router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT password FROM users WHERE username = ?';
    db.get(query, [username], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!row || !bcrypt.compareSync(password, row.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Sign in successful' });
    });
});

module.exports = router;
