import store, { RootState } from "@/app/store";
import { GetStockProps, getStockWith } from "@/lib/service";
import { RequestStatus, StockTick } from "@/lib/types";
import {
   createAsyncThunk,
   createSelector,
   createSlice,
   PayloadAction,
} from "@reduxjs/toolkit";

const abortControllers: Record<string, AbortController> = {};

export const fetchStockData = createAsyncThunk(
   "stocks/fetchStockData",
   async ({ id, duration }: GetStockProps, { dispatch }) => {
      const controller = abortControllers[id] || new AbortController();
      abortControllers[id] = controller;
      const signal = controller.signal;

      try {
         const response = await getStockWith({ id, duration });
         // If status is IN_PROGRESS, schedule another fetch
         if (
            (!signal.aborted &&
               Array.isArray(response) &&
               response.length === 0) ||
            (!Array.isArray(response) &&
               response.status === RequestStatus.IN_PROGRESS)
         ) {
            setTimeout(() => {
               if (!signal.aborted) {
                  dispatch(fetchStockData({ id, duration }));
               }
            }, 100);
         }

         return response;
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
         if (signal.aborted) return "Aborted";
         return error.message;
      }
   }
);

interface StockGraphData {
   duration: string;
   data: StockTick[];
   status: RequestStatus;
   error?: string;
}

type StockGraphsState = { [key: string]: StockGraphData };

const initialState: StockGraphsState = {};

const stockGraphsSlice = createSlice({
   name: "trackedStocks",
   initialState,
   reducers: {
      addGraph: (state, action: PayloadAction<GetStockProps>) => {
         const { id, duration } = action.payload;
         if (!state[id]) {
            state[id] = {
               data: [],
               status: RequestStatus.IDLE,
               duration,
               error: undefined,
            };

            abortControllers[id] = new AbortController();

            // Dispatch outside reducer
            setTimeout(() => {
               store.dispatch(fetchStockData({ id, duration }));
            }, 0);
         }
      },
      changeDuration: (state, action: PayloadAction<GetStockProps>) => {
         const { id, duration } = action.payload;
         if (state[id]) {
            // Abort previous request
            abortControllers[id].abort();

            // Create new controller
            abortControllers[id] = new AbortController();

            state[id] = {
               data: [],
               status: RequestStatus.IDLE,
               duration,
               error: undefined,
            };

            // Dispatch outside reducer
            setTimeout(() => {
               store.dispatch(fetchStockData({ id, duration }));
            }, 0);
         }
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchStockData.pending, (state, action) => {
            const { id, duration } = action.meta.arg;
            if (!state[id]) {
               state[id] = {
                  data: [],
                  status: RequestStatus.LOADING,
                  duration,
               };
            }
            if (state[id]) {
               state[id].status = RequestStatus.LOADING;
            }
         })
         .addCase(fetchStockData.fulfilled, (state, action) => {
            const { id, duration } = action.meta.arg;
            const result = action.payload;

            state[id].data = result.data ?? [];
            state[id].status = result.status;
            state[id].duration = duration;
         })
         .addCase(fetchStockData.rejected, (state, action) => {
            const { id } = action.meta.arg;
            if (!state[id]) return;

            state[id].data = [];
            state[id].status = RequestStatus.FAILED;
            state[id].error = action.error.message;
         });
   },
});

export const selectAllGraphIDs = createSelector(
   (state: RootState) => state.stockGraphs,
   (stockGraphs) => Object.keys(stockGraphs)
);

export const { addGraph, changeDuration } = stockGraphsSlice.actions;

export default stockGraphsSlice.reducer;
