export interface BasketState {

  basketItems: BasketItem[];
  error: string | null;
  loading: boolean;
}

const initialState: BasketState = {

  basketItems: [],
  error: null,
  loading: false
}

export const basketSlice = createSlice({

  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

  }
});

export const serviceActions = authSlice.actions;
export default authSlice.reducer;