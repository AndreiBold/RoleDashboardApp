import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../components/Spinner'
import { getRoles, getPermissions, reset } from '../features/role-permission/rolePermissionSlice'
import RoleItem from "../components/RoleItem";

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const {roles, availablePermissions, isLoading, isError, message} = useSelector((state) => state.rolesPermissions)

  useEffect(() => {
    if(isError) {
      console.log(message)
    }

    if (!user) {
      navigate("/login")
    }

    dispatch(getRoles())
    dispatch(getPermissions())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])


  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
    <section className="heading">
      <p>Roles Dashboard</p>
    </section>

    <section className="content">
      {roles.length > 0 ? (
        <div className="roles">
          {roles.map((role) => (
            <RoleItem key={role._id} role={role} permissions={availablePermissions} />
          ))}
        </div>
      ) : (<h3>No roles available</h3>)}
    </section>
    </>
  )
}

export default Dashboard
