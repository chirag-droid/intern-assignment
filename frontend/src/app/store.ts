import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import trendingStocksReducer from "@/features/trending-stocks/slice";
import allStocksReducer from "@/features/all-stocks/slice";
import stockGraphsReducer from "@/features/stock-graphs/slice";

const store = configureStore({
   reducer: {
      allStocks: allStocksReducer,
      trendingStocks: trendingStocksReducer,
      stockGraphs: stockGraphsReducer,
   },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
