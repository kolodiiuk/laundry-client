import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import serviceReducer from './slices/ServiceSlice'
import basketReducer from './slices/BasketSlice'
import ordersReducer from './slices/OrdersSlice'
import couponsReducer from './slices/CouponsSlice'
import authReducer from './slices/AuthSlice'

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    auth: authReducer,
    basket: basketReducer,
    orders: ordersReducer,
    coupons: couponsReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
