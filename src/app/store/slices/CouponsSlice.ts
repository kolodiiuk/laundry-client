import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Coupon, CreateCouponDto } from "../../models/Coupon";
import agent from "../../api/agent";

interface CouponsState {
    coupons: Coupon[];
    selectedCoupon: Coupon | null;
    loading: boolean;
    error: string | null;
}

const initialState: CouponsState = {
    coupons: [],
    selectedCoupon: null,
    loading: false,
    error: null
};

export const fetchCoupons = createAsyncThunk(
    'coupons/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            return await agent.Coupons.getAll();
        } catch (error: any) {
            return rejectWithValue(error.response?.data ?? error.message);
        }
    }
);

export const createCoupon = createAsyncThunk(
    'coupons/create',
    async (couponDto: CreateCouponDto, { rejectWithValue, dispatch }) => {
        try {
            const couponId = await agent.Coupons.create(couponDto);
            dispatch(fetchCoupons()); // Refresh coupons to get the complete data
            return couponId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data ?? error.message);
        }
    }
);

export const updateCoupon = createAsyncThunk(
    'coupons/update',
    async (couponDto: Coupon, { rejectWithValue }) => {
        try {
            return await agent.Coupons.update(couponDto);
        } catch (error: any) {
            return rejectWithValue(error.response?.data ?? error.message);
        }
    }
);

export const deleteCoupon = createAsyncThunk(
    'coupons/delete',
    async (couponId: number, { rejectWithValue }) => {
        try {
            await agent.Coupons.delete(couponId);
            return couponId;
        } catch (error: any) {
            return rejectWithValue(error.response?.data ?? error.message);
        }
    }
);

export const couponsSlice = createSlice({
    name: 'coupons',
    initialState,
    reducers: {
        clearCoupons: (state) => {
            state.coupons = [];
            state.selectedCoupon = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoupons.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchCoupons.fulfilled, (state, action) => {
            state.coupons = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchCoupons.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });

        builder.addCase(createCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createCoupon.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(createCoupon.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });

        builder.addCase(updateCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            const index = state.coupons.findIndex(c => c.id === action.payload.id);
            if (index >= 0) {
              state.coupons[index] = action.payload;
            }
            state.loading = false;
        });
        builder.addCase(updateCoupon.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });

        builder.addCase(deleteCoupon.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupons = state.coupons.filter(c => c.id !== action.payload);
            state.loading = false;
        });
        builder.addCase(deleteCoupon.rejected, (state, action) => {
            state.error = action.payload as string;
            state.loading = false;
        });
    }
});

export const { clearCoupons } = couponsSlice.actions;
export default couponsSlice.reducer;