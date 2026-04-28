const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const JWT_SECRET = process.env.JWT_SECRET || "risenext_hrm_secret_2024";

// Employee Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password are required" });

    const emp = await Employee.findOne({ email });
    if (!emp)
      return res.status(401).json({ error: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, emp.password);
    if (!isMatch)
      return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign(
      { id: emp._id, email: emp.email, role: emp.role },
      JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({
      token,
      employee: {
        id: emp._id,
        name: emp.name,
        email: emp.email,
        role: emp.role,
        department: emp.department
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify token (for frontend auth check)
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token" });
    const decoded = jwt.verify(token, JWT_SECRET);
    const emp = await Employee.findById(decoded.id).select("-password");
    res.json(emp);
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
