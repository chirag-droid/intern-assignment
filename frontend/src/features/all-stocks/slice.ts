import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAllStocks } from "@/lib/service";
import { RequestStatus, StockInformation } from "@/lib/types";
import { RootState } from "@/app/store";

interface StocksState {
   stocks: StockInformation[];
   status: RequestStatus;
   error?: string;
}

export const fetchStocks = createAsyncThunk("stocks/all", async () => {
   try {
      const response = await getAllStocks();
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
      return error.message;
   }
});

const initialState: StocksState = {
   stocks: [],
   status: RequestStatus.IDLE,
   error: undefined,
};

// This reducer deals with fetching all stocks
// asyncronously using redux thunk
const allStocksSlice = createSlice({
   name: "stocks",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchStocks.pending, (state) => {
            state.status = RequestStatus.LOADING;
         })
         .addCase(
            fetchStocks.fulfilled,
            (state, action: PayloadAction<StockInformation[]>) => {
               state.status = RequestStatus.SUCCEEDED;
               state.stocks = action.payload;
            }
         )
         .addCase(fetchStocks.rejected, (state, action) => {
            state.status = RequestStatus.FAILED;
            state.error = action.error.message;
         });
   },
});

export const selectAllStocks = (state: RootState) => state.allStocks.stocks;

export default allStocksSlice.reducer;
