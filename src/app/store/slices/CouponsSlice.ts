import {createSlice} from "@reduxjs/toolkit/react";
import {Coupon} from "../../models/Coupon";

export interface CouponsState {
  coupons: Coupon[];
  error: string | null;
  loading: boolean;
}

const initialState: CouponsState = {
  coupons: [],
  error: null,
  loading: false
}

export const couponsSlice = createSlice({
  name: 'coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const serviceActions = couponsSlice.actions;
export default couponsSlice.reducer;