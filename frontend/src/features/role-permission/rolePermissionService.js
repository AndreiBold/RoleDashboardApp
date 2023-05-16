import client from "../../config/config";

// Get roles
const getRoles = async () => {

  const response = await client.get('api/roles/', {})

  return response.data
}

// Get permissions
const getPermissions = async () => {

  const response = await client.get('api/permissions/', {})

  return response.data
}

// Get permission
const getPermission = async (permissionId) => {

  const response = await client.get(`api/permissions/${permissionId}`, {})

  return response.data
}

const rolePermissionService = {
    getRoles,
    getPermissions,
    getPermission
}

export default rolePermissionService