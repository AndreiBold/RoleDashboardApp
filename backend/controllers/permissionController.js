const asyncHandler = require("express-async-handler");

const Permission = require("../models/permissionModel");

// @desc   GET all permissions
// @route  GET /api/permissions
// @access Private
const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();
  res.status(200).json(permissions);
});

// @desc   CREATE permission
// @route  POST /api/permissions
// @access Private
const createPermission = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide the permission name");
  }

  const permission = await Permission.create({ name: req.body.name });
  res.status(200).json(permission);
});

// @desc   DELETE permission
// @route  DELETE /api/permissions/:id
// @access Private
const deletePermission = asyncHandler(async (req, res) => {
  const permission = await Permission.findById(req.params.id);

  if (!permission) {
    res.status(400);
    throw new Error("Permission not found");
  }

  await permission.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getPermissions,
  createPermission,
  deletePermission,
};
