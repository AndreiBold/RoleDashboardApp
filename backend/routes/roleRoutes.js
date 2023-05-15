const express = require('express')
const router = express. Router();
const { 
    getRoles, 
    getRole, 
    createRole, 
    addRolePermission,
    removeRolePermission, 
    deleteRole 
} = require('../controllers/roleController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getRoles).post(createRole)
router.route('/:id').get(protect, getRole).delete(deleteRole)
router.route('/:id/addPerm/:pid').put(protect, addRolePermission)
router.route('/:id/removePerm/:pid').put(protect, removeRolePermission)

module.exports = router