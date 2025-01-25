import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketItem, CreateBasketItemDto, UpdateQuantityDto } from "../../models/BasketItem";
import { BasketService } from "../../services/basketService";

// Define the BasketState interface
interface BasketState {
  basketItems: BasketItem[];
  totalPrice: number;
  error: string | null;
  loading: boolean;
}

// Define the initial state
const initialState: BasketState = {
  basketItems: [],
  totalPrice: 0,
  error: null,
  loading: false,
};

// Thunk to calculate total price
export const calculateBasketTotal = createAsyncThunk<number>(
  "basket/calculateTotal",
  async (_, { getState }) => {
    const state: any = getState(); // Access the entire Redux state
    const basketItems = state.basket.basketItems; // Get basket items from the basket slice
    const filteredServices = state.services.filteredServices; // Get filtered services from the service slice

    const total = basketItems.reduce((sum: number, item: BasketItem) => {
      const service = filteredServices.find((s: any) => s.id === item.serviceId);
      const price = service?.pricePerUnit ?? 0;
      console.log(price);
      return sum + price * item.quantity;
    }, 0);

    return total;
  }
);

// Other thunks for basket actions
export const getBasket = createAsyncThunk<BasketItem[], number>(
  "basket/getBasket",
  async (userId, { rejectWithValue }) => {
    try {
      return await BasketService.getBasket(userId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToBasket = createAsyncThunk<BasketItem, CreateBasketItemDto>(
  "basket/addToBasket",
  async (createDto, { rejectWithValue }) => {
    try {
      return await BasketService.addItem(createDto);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuantity = createAsyncThunk<BasketItem, UpdateQuantityDto>(
  "basket/updateQuantity",
  async (updateDto, { dispatch, rejectWithValue }) => {
    try {
      const result = await BasketService.updateQuantity(updateDto);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromBasket = createAsyncThunk<number, number>(
  "basket/removeFromBasket",
  async (basketItemId, { rejectWithValue }) => {
    try {
      await BasketService.removeItem(basketItemId);
      return basketItemId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Create the basket slice
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.basketItems = [];
      state.totalPrice = 0;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBasket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.basketItems = action.payload;
      state.loading = false;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(addToBasket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addToBasket.fulfilled, (state, action) => {
      state.basketItems.push(action.payload);
      state.loading = false;
    });
    builder.addCase(addToBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateQuantity.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateQuantity.fulfilled, (state, action) => {
      const index = state.basketItems.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.basketItems[index] = action.payload;
      }
      state.loading = false;
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(removeFromBasket.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(removeFromBasket.fulfilled, (state, action) => {
      state.basketItems = state.basketItems.filter((item) => item.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(removeFromBasket.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addCase(calculateBasketTotal.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(calculateBasketTotal.fulfilled, (state, action) => {
      state.totalPrice = action.payload; // Set the total price
      state.loading = false;
    });
    builder.addCase(calculateBasketTotal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

// Export actions and reducer
export const { clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
