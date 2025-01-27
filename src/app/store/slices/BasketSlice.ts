import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BasketItem, CreateBasketItemDto, UpdateQuantityDto } from "../../models/BasketItem";
import { BasketService } from "../../services/basketService";

interface BasketState {
  basketItems: BasketItem[];
  totalPrice: number;
  error: string | null;
  loading: boolean;
}

const initialState: BasketState = {
  basketItems: [],
  totalPrice: 0,
  error: null,
  loading: false,
};

export const calculateBasketTotal = createAsyncThunk<number>(
  "basket/calculateTotal",
  async (_, { getState }) => {
    const state: any = getState(); 
    const basketItems = state.basket.basketItems; 
    const filteredServices = state.services.filteredServices;

    const total = basketItems.reduce((sum: number, item: BasketItem) => {
      const service = filteredServices.find((s: any) => s.id === item.serviceId);
      const price = service?.pricePerUnit ?? 0;
      console.log(price);
      return sum + price * item.quantity;
    }, 0);

    return total;
  }
);

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
  async (updateDto, {rejectWithValue }) => {
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
      state.basketItems = [...state.basketItems, action.payload];
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
      state.basketItems = state.basketItems.map(item =>
        item.id === action.payload.id ? action.payload : item
      );
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
      state.totalPrice = action.payload;
      state.loading = false;
    });
    builder.addCase(calculateBasketTotal.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { clearBasket } = basketSlice.actions;
export default basketSlice.reducer;
