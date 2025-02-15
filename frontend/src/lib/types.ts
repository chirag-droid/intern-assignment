export enum RequestStatus {
   IDLE = "IDLE",
   LOADING = "LOADING",
   IN_PROGRESS = "IN_PROGRESS",
   COMPLETE = "COMPLETE",
   SUCCEEDED = "SUCCEEDED",
   FAILED = "FAILED",
}

export interface StockInformation {
   id: string;
   name: string;
   symbol: string;
   available: string[];
}

export interface StockTick {
   price: number;
   change: number;
   change_percent: number;
   volume: number;
   timestamp: string;
}

export interface StockPriceHistory {
   data: StockTick[];
   status: RequestStatus;
}
