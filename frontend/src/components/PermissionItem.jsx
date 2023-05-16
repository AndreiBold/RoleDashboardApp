function PermissionItem({ permission, allPermissions }) {
    var getPermissionName = (allPermissions) => {
      const matchingPermission = allPermissions.find(p => p._id === permission);
      return matchingPermission ? matchingPermission.name : '';
    }
  
    return (
      <div className="permission">
        <span>{getPermissionName(allPermissions)}</span>
      </div>
    )
  }
  
  export default PermissionItem;