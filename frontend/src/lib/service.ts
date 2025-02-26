import client from "./client";
import { StockInformation, StockPriceHistory } from "./types";

export async function getTrendingStocks() {
   // Ideally this was a fetch for the trending stocks
   const response = await client.get<StockInformation[]>(`/api/stocks`);
   return response.data.slice(0, 3);
}

export async function getAllStocks() {
   const response = await client.get<StockInformation[]>(`/api/stocks`);
   return response.data;
}

export interface GetStockProps {
   id: string;
   duration: string;
}

export async function getStockWith({ id, duration }: GetStockProps) {
   const response = await client.post<StockPriceHistory | []>(
      `/api/stocks/${id}`,
      { duration }
   );
   return response.data;
}
