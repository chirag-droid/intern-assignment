import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import trendingStocksReducer from "@/features/trending-stocks/slice";
import stocksReducer from "@/features/stock-selection/slice";
import stockPricesReducer from "@/features/stock-price-graph/slice";

const store = configureStore({
   reducer: {
      trending: trendingStocksReducer,
      stocks: stocksReducer,
      stockPrices: stockPricesReducer,
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
