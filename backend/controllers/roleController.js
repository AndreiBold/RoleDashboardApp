const asyncHandler = require("express-async-handler");

const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel");

// @desc   GET roles
// @route  GET /api/roles
// @access Private
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find();
  res.status(200).json(roles);
});

// @desc   GET role
// @route  GET /api/roles/:id
// @access Private
const getRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(400);
    throw new Error("Role not found");
  }

  res.status(200).json(role);
});

// @desc   CREATE role
// @route  POST /api/roles
// @access Private
const createRole = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide the role name");
  }

  const role = await Role.create({ name: req.body.name });
  res.status(200).json(role);
});

// @desc   UPDATE role by adding a permission to it
// @route  PUT /api/roles/:id/addPerm/:pid
// @access Private
const addRolePermission = asyncHandler(async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.pid)

    if (!permission) {
      res.status(400);
      throw new Error("Permission not found");
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { permissions: permission } },
      { new: true }
    ).populate("permissions");

    if (!role) {
      res.status(400);
      throw new Error("Role not found");
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   UPDATE role by removing a permission from it
// @route  PUT /api/roles/:id/removePerm/:pid
// @access Private
const removeRolePermission = asyncHandler(async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.pid)

    if (!permission) {
      res.status(400);
      throw new Error("Permission not found");
    }

    const role = await Role.findByIdAndUpdate(
      req.params.id,
      { $pull: { permissions: permission } },
      { new: true }
    ).populate("permissions");

    if (!role) {
      res.status(400);
      throw new Error("Role not found");
    }

    res.status(200).json(role);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @desc   DELETE role
// @route  DELETE /api/roles/:id
// @access Private
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id);

  if (!role) {
    res.status(400);
    throw new Error("Role not found");
  }

  await role.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getRoles,
  getRole,
  createRole,
  addRolePermission,
  removeRolePermission,
  deleteRole,
};
