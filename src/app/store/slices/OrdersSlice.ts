import {createSlice} from "@reduxjs/toolkit/react";
import {Order} from "../../models/Order";

export interface OrdersState {

  orders: Order[];
  error: string | null;
  loading: boolean;
}

const initialState: OrdersState = {

  orders: [],
  error: null,
  loading: false
}

export const ordersSlice = createSlice({

  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const ordersActions = ordersSlice.actions;
export default ordersSlice.reducer;