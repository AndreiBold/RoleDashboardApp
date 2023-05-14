const asyncHandler = require('express-async-handler')

const Role = require('../models/roleModel')

// @desc   GET roles
// @route  GET /api/roles
// @access Private
const getRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find()
  res.status(200).json(roles);
})

// @desc   GET role
// @route  GET /api/role/:id
// @access Private
const getRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id)

  if(!role) {
    res.status(400)
    throw new Error('Role not found')
  }
  res.status(200).json(role);
})

// @desc   CREATE role
// @route  POST /api/roles
// @access Private
const createRole = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide the role name");
  }

  const role = await Role.create({ name: req.body.name})
  res.status(200).json(role);
})

// @desc   UPDATE role
// @route  PUT /api/roles/:id
// @access Private
const updateRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id)

  if(!role) {
    res.status(400)
    throw new Error('Role not found')
  }

  const updatedRole = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true })
  res.status(200).json(updatedRole);
})

// @desc   DELETE role
// @route  DELETE /api/roles/:id
// @access Private
const deleteRole = asyncHandler(async (req, res) => {
  const role = await Role.findById(req.params.id)

  if(!role) {
    res.status(400)
    throw new Error('Role not found')
  }

  await role.deleteOne()
  res.status(200).json({ id: req.params.id });
})

module.exports = {
  getRoles,
  getRole,
  createRole,
  updateRole,
  deleteRole,
};
