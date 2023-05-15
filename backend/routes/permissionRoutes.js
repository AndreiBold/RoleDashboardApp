const express = require('express')
const router = express. Router();
const { 
    getPermissions,
    getPermission,
    createPermission,
    deletePermission 
} = require('../controllers/permissionController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPermissions).post(createPermission)
router.route('/:id').delete(deletePermission)

module.exports = router