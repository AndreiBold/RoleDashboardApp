import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import rolePermissionService from "./rolePermissionService";

const initialState = {
  roles: [],
  availablePermissions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get roles
export const getRoles = createAsyncThunk(
  "roles/getAll",
  async (_, thunkAPI) => {
    try {
      return await rolePermissionService.getRoles();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log('NNN: ' + message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get permissions
export const getPermissions = createAsyncThunk(
  "permissions/getAll",
  async (_, thunkAPI) => {
    try {
      return await rolePermissionService.getPermissions();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log('NNN: ' + message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get permission
export const getPermission = createAsyncThunk(
  "permissions/getOne",
  async (id, thunkAPI) => {
    try {
      return await rolePermissionService.getPermission(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
        console.log('NNN: ' + message)
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const rolePermissionSlice = createSlice({
  name: "rolePermission",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.roles = action.payload;
      })
      .addCase(getRoles.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.availablePermissions = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = rolePermissionSlice.actions;
export default rolePermissionSlice.reducer;
