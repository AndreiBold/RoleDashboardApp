import PermissionItem from "./PermissionItem"

function RoleItem({role, permissions}) {
  return (
    <div className="role">
        <div>
            <span>Role Name:  </span><span>{role.name}</span>
        </div>
        <div>
            <span>Created At:  </span><span>{new Date(role.createdAt).toLocaleString('en-Us')}</span>
        </div>
        <div>
        <span>Updated At:  </span><span>{new Date(role.updatedAt).toLocaleString('en-Us')}</span>
        </div>
        <div>
          <span>Permissions:  </span>{role.permissions.length > 0 ? 
          (<div className="permissions">
          {role.permissions.map((permission) => (
            <PermissionItem key={permission._id} permission={permission} allPermissions={permissions} />
          ))}
        </div>): (<span>No permissions added yet</span>)}
        </div>
    </div>
  )
}

export default RoleItem