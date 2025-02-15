import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
   CardFooter,
} from "@/components/ui/card";
import { useAppSelector } from "@/app/store";
import { selectTrendingStocks } from "./slice";

export default function TrendingStocks() {
   const stocks = useAppSelector(selectTrendingStocks);

   return (
      <section>
         <h1 className="font-medium text-2xl">Trending Stocks</h1>
         <div className="grid grid-cols-3 gap-2 pr-6 py-4">
            {stocks.slice(0, 3).map((stock) => (
               <Card key={stock.id}>
                  <CardHeader>
                     <CardTitle>{stock.name}</CardTitle>
                     <CardDescription>{stock.symbol}</CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter></CardFooter>
               </Card>
            ))}
         </div>
      </section>
   );
}
