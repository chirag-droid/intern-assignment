import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import { getAllStocks } from "@/lib/service";
import { RequestStatus, StockInformation } from "@/lib/types";

interface StocksState {
   stocksList: StockInformation[];
   selectedStock?: string;
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
   stocksList: [],
   selectedStock: undefined,
   status: RequestStatus.IDLE,
   error: undefined,
};

const stocksSlice = createSlice({
   name: "stocks",
   initialState,
   reducers: {
      selectStock: (state, action: PayloadAction<string>) => {
         if (state.stocksList.find((stock) => stock.id === action.payload)) {
            state.selectedStock = action.payload;
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchStocks.pending, (state) => {
            state.status = RequestStatus.LOADING;
         })
         .addCase(
            fetchStocks.fulfilled,
            (state, action: PayloadAction<StockInformation[]>) => {
               state.status = RequestStatus.SUCCEEDED;
               state.stocksList = action.payload;
               state.selectedStock = action.payload[0].id;
            }
         )
         .addCase(fetchStocks.rejected, (state, action) => {
            state.status = RequestStatus.FAILED;
            state.error = action.error.message;
         });
   },
});

export const selectAllStocks = (state: RootState) => state.stocks.stocksList;
export const getSelectedStock = (state: RootState) =>
   state.stocks.selectedStock;

export const { selectStock } = stocksSlice.actions;

export default stocksSlice.reducer;
