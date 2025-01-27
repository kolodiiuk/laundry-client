import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {User} from "../../models/User";
import agent from "../../api/agent";
import {Address} from "../../models/Address";

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[];
  allAddresses: Address[];
  addresses: Address[];
  error: string | null;
  loading: boolean;
}

const user = localStorage.getItem('user') 
  ? JSON.parse(localStorage.getItem('user')!) 
  : null;

const initialState: AuthState = {
  isAuthenticated: !!user,
  user: user,
  users: [],
  allAddresses: [],
  addresses: [],
  error: null,
  loading: false
}

export const login = createAsyncThunk<User, LoginCredentials>(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const user = await agent.Auth.login(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk<User, RegisterCredentials>(
  'auth/register',
  async (credentials, {rejectWithValue}) => {
    try {
      const user = await agent.Auth.register(credentials);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    localStorage.removeItem('user');
  }
);

export const fetchUserAddresses = createAsyncThunk(
  'auth/fetchAddresses',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: any = getState();
      const userId = state.auth.user?.id;
      if (!userId) throw new Error('User not authenticated');
      const addresses = await agent.Auth.getAddresses(userId);
      return addresses; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUsers = createAsyncThunk(
  'auth/fetchAllUsers',
  async (_, {rejectWithValue}) => {
    try {
      return await agent.Auth.getAllUsers();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)

export const fetchAllAddresses = createAsyncThunk(
  'auth/fetchAllAddresses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agent.Auth.getAllAddresses();
      if (!response) throw new Error('No addresses found');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const createAddress = createAsyncThunk<Address, Omit<Address, 'id'>>(
  'auth/createAddress',
  async (address, {rejectWithValue}) => {
    try {
      return await agent.Auth.createAddress(address);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateAddress = createAsyncThunk<Address, Address>(
  'auth/updateAddress',
  async (address, {rejectWithValue}) => {
    try {
      return await agent.Auth.updateAddress(address);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteAddress = createAsyncThunk<number, number>(
  'auth/deleteAddress',
  async (addressId, {rejectWithValue}) => {
    try {
      await agent.Auth.deleteAddress(addressId);
      return addressId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload as string;
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload as string;
    });

    builder.addCase(logout.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    });

    builder.addCase(fetchUserAddresses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserAddresses.fulfilled, (state, action) => {
      state.addresses = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUserAddresses.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch addresses: ${action.payload as string}`;
      state.addresses = [];
    });

    builder.addCase(createAddress.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createAddress.fulfilled, (state, action) => {
      state.addresses.push(action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to create address: ${action.payload as string}`;
    });

    builder.addCase(updateAddress.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateAddress.fulfilled, (state, action) => {
      const index = state.addresses.findIndex(a => a.id === action.payload.id);
      if (index !== -1) state.addresses[index] = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to update address: ${action.payload as string}`;
    });

    builder.addCase(deleteAddress.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteAddress.fulfilled, (state, action) => {
      state.addresses = state.addresses.filter(a => a.id !== action.payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to delete address: ${action.payload as string}`;
    });

    builder.addCase(fetchAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch users: ${action.payload as string}`;
    });

    builder.addCase(fetchAllAddresses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllAddresses.fulfilled, (state, action) => {
      state.allAddresses = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllAddresses.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch addresses: ${action.payload as string}`;
    });
  }
});

export default authSlice.reducer;
