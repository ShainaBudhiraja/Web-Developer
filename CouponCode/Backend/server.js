const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected ✅"))
    .catch(err => console.log("Mongo Error ❌", err));
console.log("MONGO_URI:", process.env.MONGO_URI);
// Generate unique coupon
const generateCoupon = async () => {
    let code;
    let exists = true;

    while (exists) {
        code = "COUPON-" + Math.random().toString(36).substring(2, 8).toUpperCase();
        const user = await User.findOne({ coupon: code });
        if (!user) exists = false;
    }

    return code;
};

// API: Register Email + Generate Coupon
app.post("/register", async (req, res) => {
    try {
        const { email } = req.body;

        console.log("Incoming email:", email); // 👈 ADD THIS

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "Email already used" });
        }

        const coupon = await generateCoupon();

        const newUser = new User({ email, coupon });

        console.log("Before save");
        await newUser.save();
        console.log("After save");

        console.log("Saved user:", newUser); // 👈 ADD THIS

        res.json({ message: "Coupon generated", coupon });

    } catch (error) {
        console.log("❌ FULL ERROR:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});