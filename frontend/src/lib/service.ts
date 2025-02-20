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

export async function getStockWith({ id }: { id: string }) {
   const response = await client.get<StockPriceHistory | []>(
      `/api/stocks/${id}`
   );
   return response.data;
}
