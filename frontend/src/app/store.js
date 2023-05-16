import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice"
import rolePermissionReducer from "../features/role-permission/rolePermissionSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    rolesPermissions: rolePermissionReducer
  },
})