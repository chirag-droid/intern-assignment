import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
} from "@/components/ui/card";
import { useAppSelector } from "@/app/store";
import { selectTrendingStocks } from "./slice";

export default function TrendingStocks() {
   const stocks = useAppSelector(selectTrendingStocks);

   const trendingStocks = stocks.map((stock) => {
      return (
         <Card key={stock.id}>
            <CardHeader className="p-3 md:p-4">
               <CardTitle>{stock.name}</CardTitle>
               <CardDescription>{stock.symbol}</CardDescription>
            </CardHeader>
         </Card>
      );
   });

   return (
      <section>
         <h1 className="font-medium text-xl md:text-2xl">Trending Stocks</h1>
         <div className="grid grid-cols-2 gap-2 md:gap-3 py-2">
            {trendingStocks}
         </div>
      </section>
   );
}
