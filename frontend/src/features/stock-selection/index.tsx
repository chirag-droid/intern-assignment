import { useAppDispatch, useAppSelector } from "@/app/store";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { getSelectedStock, selectAllStocks, selectStock } from "./slice";

export default function SelectStock() {
   const stocks = useAppSelector(selectAllStocks);

   const selectedStock = useAppSelector(getSelectedStock);

   const dispatch = useAppDispatch();

   const onValueChange = (id: string) => {
      dispatch(selectStock(id));
   };

   const items = stocks.map((stock) => (
      <SelectItem key={stock.id} value={stock.id}>
         {stock.name}
      </SelectItem>
   ));

   return (
      <Select
         value={selectedStock}
         onValueChange={onValueChange}
         defaultValue={selectedStock}
      >
         <SelectTrigger className="ring-0! w-52 border-none shadow-none outline-none">
            <SelectValue placeholder="Select a stock" />
         </SelectTrigger>
         <SelectContent>
            <SelectGroup>
               <SelectLabel>Stocks</SelectLabel>
               {items}
            </SelectGroup>
         </SelectContent>
      </Select>
   );
}
