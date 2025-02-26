import * as React from "react";

import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/app/store";
import { selectAllStocks } from "../all-stocks/slice";
import { StockInformation } from "@/lib/types";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

interface StocksDropdownProps {
   onSelect: (stockId: StockInformation) => void;
}

export default function StocksDropDown(props: StocksDropdownProps) {
   const isDesktop = useMediaQuery("(min-width: 768px)");

   const [open, setOpen] = React.useState(false);

   if (isDesktop) {
      return (
         <div className="flex items-center space-x-4">
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button size="sm" variant="outline" className="justify-start">
                     + Add Graph
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="p-0" side="right" align="start">
                  <StocksList setOpen={setOpen} onSelect={props.onSelect} />
               </PopoverContent>
            </Popover>
         </div>
      );
   }

   return (
      <Drawer open={open} onOpenChange={setOpen}>
         <DrawerTrigger asChild>
            <Button size="sm" variant="outline" className="justify-start">
               + Add Graph
            </Button>
         </DrawerTrigger>
         <DrawerContent className="p-1">
            <div className="mt-4 border-t">
               <StocksList setOpen={setOpen} onSelect={props.onSelect} />
            </div>
         </DrawerContent>
      </Drawer>
   );
}

interface StocksListProps {
   onSelect: (stock: StockInformation) => void;
   setOpen: (value: React.SetStateAction<boolean>) => void;
}

function StocksList({ setOpen, onSelect }: StocksListProps) {
   const stocks = useAppSelector(selectAllStocks);

   return (
      <Command>
         <CommandInput placeholder="Stock name..." />
         <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
               {stocks.map((stock) => (
                  <CommandItem
                     key={stock.id}
                     value={stock.name}
                     onSelect={(value) => {
                        const selectedStock = stocks.find(
                           (stock) => stock.name === value
                        );
                        onSelect(selectedStock!);
                        setOpen(false);
                     }}
                  >
                     {stock.name}
                  </CommandItem>
               ))}
            </CommandGroup>
         </CommandList>
      </Command>
   );
}
