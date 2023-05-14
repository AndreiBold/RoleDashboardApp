const asyncHandler = require('express-async-handler')

// @desc   GET roles
// @route  GET /api/roles
// @access Private
const getRoles = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get roles" });
})

// @desc   GET role
// @route  GET /api/role/:id
// @access Private
const getRole = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get role ${req.params.id}` });
})

// @desc   CREATE role
// @route  POST /api/roles
// @access Private
const createRole = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide the role name");
  }
  res.status(200).json({ message: "Create role" });
})

// @desc   UPDATE role
// @route  PUT /api/roles/:id
// @access Private
const updateRole = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update role ${req.params.id}` });
})

// @desc   DELETE role
// @route  DELETE /api/roles/:id
// @access Private
const deleteRole = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete role ${req.params.id}` });
})

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
