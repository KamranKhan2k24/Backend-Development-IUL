const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();

app.use(express.json());

const JWT_SECRET = "my_secret_key";

// Demo user
const user = {
    id: 1,
    username: "admin",
    password: bcrypt.hashSync("12345", 10)
};


// Login
app.post("/login", async (req, res) => {

    const { username, password } = req.body;

    if (username !== user.username) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid username or password"
        });
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username
        },
        JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );

    res.json({
        message: "Login successful",
        token: token
    });
});


// Authentication Middleware
function authenticateToken(req, res, next) {

    const authHeader = req.headers["authorization"];

    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token required"
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.status(403).json({
                message: "Invalid or expired token"
            });
        }

        req.user = decoded;

        next();
    });
}


// Protected Route
app.get("/profile", authenticateToken, (req, res) => {

    res.json({
        message: "Welcome to your profile!",
        user: req.user
    });
});

app.get("/", (req, res) => {
    res.send("JWT Authentication Server is running");
});

// Start Server
app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});