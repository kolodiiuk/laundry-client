import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Order, CreateOrderDto } from "../../models/Order";
import agent from "../../api/agent";
import { OrderItem } from "../../models/OrderItem";

interface OrdersState {
  allOrders: Order[];
  userOrders: Order[]; 
  orderItems: OrderItem[];
  selectedOrder: Order | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  allOrders: [],
  userOrders: [],
  orderItems: [],
  selectedOrder: null,
  loading: false,
  error: null
};

export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await agent.Orders.getAll();
      if (!response) {
        throw new Error('Orders not found');
      }
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
      if (!response) {
        throw new Error('Orders not found');
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.title ?? error.message);
    }
  }
);

export const fetchOrderItems = createAsyncThunk(
  'orders/fetchItems',
  async (orderId: number, { rejectWithValue }) => {
    try {
      const response = await agent.Orders.getOrderItems(orderId);
      if (!response) throw new Error('Failed to fetch order items');
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
      if (!response) {
        throw new Error('Order not found');
      }
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
      if (!response) {
        throw new Error('Failed to create order');
      }
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
      await agent.Orders.update(order);
      const updatedOrder = await agent.Orders.getById(order.id);
      if (!updateOrder) {
        throw new Error("Error updating order");
      }
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

    builder.addCase(fetchOrderItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrderItems.fulfilled, (state, action) =>{
      state.loading = false;
      state.orderItems = action.payload;
    });
    builder.addCase(fetchOrderItems.rejected, (state, action) => {
      state.error = `Failed to fetch order items: ${action.payload as string}`;
      state.loading = false;
    });

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
