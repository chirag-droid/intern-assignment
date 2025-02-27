import { useAppDispatch, useAppSelector } from "@/app/store";
import StocksDropdown from "./dropdown";
import { addGraph, selectAllGraphIDs } from "./slice";
import { StockInformation } from "@/lib/types";
import StockGraph from "./stock-graph";
import { Button } from "@/components/ui/button";
import client from "@/lib/client";
import { toast } from "sonner";

export default function TrackedStocks() {
   const graphs = useAppSelector(selectAllGraphIDs);
   const dispatch = useAppDispatch();

   const onAdd = (stock: StockInformation) => {
      dispatch(addGraph({ id: stock!.id, duration: stock!.available[0] }));
   };

   const clearCache = () => {
      client.post("/debug/clearCache").then(() => {
         toast("Cache cleared successfully!");
      });
   };

   return (
      <section>
         <div className="flex space-x-2 items-end">
            <div>
               <h1 className="text-xl md:text-2xl font-medium">
                  Tracked Stock
               </h1>
               <p className="text-neutral-500">
                  You can clear the cache to see the data polled in real time.
               </p>
            </div>
            <StocksDropdown onSelect={onAdd} />
            <Button size="sm" onClick={clearCache} variant="destructive">
               Clear Cache
            </Button>
         </div>

         <div className="py-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            {graphs.map((id) => (
               <StockGraph key={id} stockId={id} />
            ))}
         </div>
      </section>
   );
}
