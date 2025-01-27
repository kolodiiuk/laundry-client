import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, CreateOrderDto } from "../../models/Order";
import agent from "../../api/agent";

interface OrdersState {
  allOrders: Order[];      // Admin view
  userOrders: Order[];     // Customer view
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  allOrders: [],
  userOrders: [],
  selectedOrder: null,
  loading: false,
  error: null
};

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agent.Orders.getAll();
      if (!response) throw new Error('Orders not found');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await agent.Orders.getByUser(userId);
      if (!response) throw new Error('Orders not found');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  'orders/fetchById',
  async (orderId: number, { rejectWithValue }) => {
    try {
      const response = await agent.Orders.getById(orderId);
      if (!response) throw new Error('Order not found');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'orders/create',
  async (orderDto: CreateOrderDto, { rejectWithValue }) => {
    try {
      const response = await agent.Orders.create(orderDto);
      if (!response) throw new Error('Failed to create order');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/update',
  async (order: Order, { rejectWithValue }) => {
    try {
      // Get fresh order data after update
      await agent.Orders.update(order);
      console.log("updated", order)
      const updatedOrder = await agent.Orders.getById(order.id);
      console.log("updated2")
      return updatedOrder;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.allOrders = [];
      state.userOrders = [];
      state.selectedOrder = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch all orders (admin)
    builder.addCase(fetchAllOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
      state.allOrders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAllOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch orders: ${action.payload as string}`;
    });

    // Fetch user orders
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch user orders: ${action.payload as string}`;
    });

    // Fetch single order
    builder.addCase(fetchOrderById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderById.fulfilled, (state, action) => {
      state.selectedOrder = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchOrderById.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch order: ${action.payload as string}`;
    });

    // Create order
    builder.addCase(createOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.allOrders = [...state.allOrders, action.payload];
      state.userOrders = [...state.allOrders, action.payload];
      state.loading = false;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to create order: ${action.payload as string}`;
    });

    // Update order
    builder.addCase(updateOrder.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.allOrders = state.allOrders.map(
        (item) => item.id === action.payload.id ? action.payload : item);
      state.userOrders = state.userOrders.map(
        (item) => item.id === action.payload.id ? action.payload : item);
      if (state.selectedOrder?.id === action.payload.id) {
        state.selectedOrder = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to update order: ${action.payload as string}`;
    });
  }
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
