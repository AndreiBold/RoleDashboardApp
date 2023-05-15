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

router.route('/').get(getRoles).post(createRole)
router.route('/:id').get(getRole).delete(deleteRole)
router.route('/:id/addPerm/:pid').put(addRolePermission)
router.route('/:id/removePerm/:pid').put(removeRolePermission)

module.exports = router