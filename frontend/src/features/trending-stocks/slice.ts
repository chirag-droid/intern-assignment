import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { getTrendingStocks } from "@/lib/service";
import { RequestStatus, StockInformation } from "@/lib/types";

interface TrendingStocksState {
   stocks: StockInformation[];
   status: RequestStatus;
   error?: string;
}

export const fetchTrendingStocks = createAsyncThunk(
   "stocks/trending",
   async () => {
      try {
         const response = await getTrendingStocks();
         return response;
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         return error.message;
      }
   }
);

const initialState: TrendingStocksState = {
   stocks: [],
   status: RequestStatus.IDLE,
   error: undefined,
};

const trendingStocksSlice = createSlice({
   name: "trending",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchTrendingStocks.pending, (state) => {
            state.status = RequestStatus.LOADING;
         })
         .addCase(
            fetchTrendingStocks.fulfilled,
            (state, action: PayloadAction<StockInformation[]>) => {
               state.status = RequestStatus.SUCCEEDED;
               state.stocks = action.payload;
            }
         )
         .addCase(fetchTrendingStocks.rejected, (state, action) => {
            state.status = RequestStatus.FAILED;
            state.error = action.error.message;
         });
   },
});

export const selectTrendingStocks = (state: RootState) => state.trending.stocks;

export default trendingStocksSlice.reducer;
