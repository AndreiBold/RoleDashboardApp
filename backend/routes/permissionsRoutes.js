const express = require('express')
const router = express. Router();
const { 
    getPermissions,
    getPermission,
    createPermission,
    deletePermission 
} = require('../controllers/permissionController')

router.route('/').get(getPermissions).post(createPermission)
router.route('/:id').delete(deletePermission)

module.exports = router