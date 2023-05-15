const express = require('express')
const router = express. Router();
const { 
    getPermissions,
    createPermission,
    deletePermission 
} = require('../controllers/permissionController')

// const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getPermissions).post(createPermission)
router.route('/:id').delete(deletePermission)

module.exports = router