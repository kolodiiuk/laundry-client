import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import agent from "../../api/agent";

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
    error: string | null;
    loading: boolean;
}

// Load user from localStorage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null;

const initialState: AuthState = {
    isAuthenticated: !!user,
    user: user,
    error: null,
    loading: false
}

export const login = createAsyncThunk<User, LoginCredentials>(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
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
    async (credentials, { rejectWithValue }) => {
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

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const user = action.payload;
            state.user = user;
            state.isAuthenticated = true;
        }
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
    }
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
