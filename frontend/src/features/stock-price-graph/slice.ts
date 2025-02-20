import { StockTick } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

interface StockPricesState {
   stockPrices: { [key: string]: StockTick[] };
}

const initialState: StockPricesState = {
   stockPrices: {},
};

const stockPricesSlice = createSlice({
   name: "stock-price",
   initialState,
   reducers: {},
});

// export const selectAllStocks = (state: RootState) => state.stocks.stocksList;
// export const getSelectedStock = (state: RootState) =>
//    state.stocks.selectedStock;

// export const { selectStock } = stocksSlice.actions;

export default stockPricesSlice.reducer;
