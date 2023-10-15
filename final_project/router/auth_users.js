const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

// Only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Validate credentials
    const user = users[username];
    if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT
    const token = jwt.sign({ username: username }, 'your_secret_key', { expiresIn: '1h' });

    // Send response
    return res.status(200).json({
        message: "Login successful",
        token: token
    });
});


// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const { review } = req.body;
    const username = req.user.username;

    // Check if review is provided
    if (!review) {
        return res.status(400).json({ message: "Review is required" });
    }

    // Check if book exists
    const book = books[isbn];
    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    // Add or update review
    book.reviews[username] = review;
    return res.status(200).json({ message: "Review added/updated successfully" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

