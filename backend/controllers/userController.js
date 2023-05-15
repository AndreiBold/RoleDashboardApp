const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Role = require("../models/roleModel");

// @desc   REGISTER a user
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, roleName } = req.body;

  if (!name || !email || !password || !roleName) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Check if selected role name exists
  const role = await Role.findOne({ name: roleName });

  if (!role) {
    res.status(400);
    throw new Error("Role not found");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: role.name,
      token: generateToken(user._id)
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc   AUTHENTICATE a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body

  // Check for user email
  const user = await User.findOne({email})

  if(user && (await bcrypt.compare(password, user.password))) {
    const role = await Role.findOne(user.role)

    res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: role.name,
        token: generateToken(user._id)
      })
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
  
    res.json({ message: "Login user" });
});

// @desc   Get user data
// @route  POST /api/users/me
// @access Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30m'
    })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
