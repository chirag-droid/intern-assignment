import { RootState, useAppDispatch, useAppSelector } from "@/app/store";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { parseShorthandDate } from "@/lib/utils";
import { createSelector } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import {
   Area,
   AreaChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from "recharts";
import { changeDuration } from "./slice";

export interface StockGraphProps {
   stockId: string;
}

export default function StockGraph(props: StockGraphProps) {
   const dispatch = useAppDispatch();

   const stockGraph = useAppSelector(
      createSelector(
         [(state: RootState) => state.stockGraphs],
         (stockGraphs) => stockGraphs[props.stockId]
      )
   );

   const stock = useAppSelector(
      createSelector([(state: RootState) => state.allStocks.stocks], (stocks) =>
         stocks.find((stock) => stock.id === props.stockId)
      )
   );

   // Dynamic min and max values for axes
   const [yDomain, setYDomain] = useState({ min: 0, max: 0 });

   useEffect(() => {
      if (stockGraph.data.length > 0) {
         // For price chart
         const prices = stockGraph.data.map((item) => item.price);
         const minPrice = Math.min(...prices);
         const maxPrice = Math.max(...prices);
         const padding = (maxPrice - minPrice) * 0.1; // 10% padding

         setYDomain({
            min: Math.max(0, minPrice - padding),
            max: maxPrice + padding,
         });
      }
   }, [stockGraph.data]);

   const formattedData = stockGraph.data.map((data) => {
      return {
         ...data,
         formattedDate: new Date(data.timestamp).toLocaleDateString(),
      };
   });

   return (
      <Card>
         <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
               <CardTitle>{stock?.name}</CardTitle>
               <CardDescription>
                  Showing stock price for last{" "}
                  {parseShorthandDate(stockGraph.duration).replace(" ago", "")}
               </CardDescription>
            </div>

            <Select
               value={stockGraph.duration}
               onValueChange={(value) =>
                  dispatch(changeDuration({ id: stock!.id, duration: value }))
               }
            >
               <SelectTrigger
                  className="w-[160px] rounded-lg sm:ml-auto"
                  aria-label="Select a value"
               >
                  <SelectValue placeholder="Last 3 months">
                     {parseShorthandDate(stockGraph.duration)}
                  </SelectValue>
               </SelectTrigger>
               <SelectContent className="rounded-xl">
                  {stock!.available.map((availability) => (
                     <SelectItem key={availability} value={availability}>
                        {parseShorthandDate(availability)}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </CardHeader>
         <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
            <div className="h-64 md:h-80 mb-8">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                     data={formattedData}
                     margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                  >
                     <defs>
                        <linearGradient
                           id="colorPrice"
                           x1="0"
                           y1="0"
                           x2="0"
                           y2="1"
                        >
                           <stop
                              offset="5%"
                              stopColor="#3b82f6"
                              stopOpacity={0.8}
                           />
                           <stop
                              offset="95%"
                              stopColor="#3b82f6"
                              stopOpacity={0.1}
                           />
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" />
                     <XAxis
                        dataKey="formattedDate"
                        padding={{ left: 0, right: 0 }}
                     />
                     <YAxis
                        domain={[yDomain.min, yDomain.max]}
                        tickFormatter={(value) => `$${value.toFixed(2)}`}
                     />
                     <Tooltip
                        formatter={(value, name) => [
                           `$${Number(value).toFixed(2)}`,
                           name === "price" ? "Price" : name,
                        ]}
                        labelFormatter={(label) => `Date: ${label}`}
                     />
                     <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        activeDot={{
                           r: 6,
                           stroke: "#3b82f6",
                           strokeWidth: 2,
                           fill: "#fff",
                        }}
                        isAnimationActive={true}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
            {/* <ChartContainer
               // config={chartConfig}
               className="aspect-auto h-[250px] w-full"
            >
               <AreaChart data={filteredData}>
                  <defs>
                     <linearGradient
                        id="fillDesktop"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                     >
                        <stop
                           offset="5%"
                           stopColor="var(--color-desktop)"
                           stopOpacity={0.8}
                        />
                        <stop
                           offset="95%"
                           stopColor="var(--color-desktop)"
                           stopOpacity={0.1}
                        />
                     </linearGradient>
                     <linearGradient
                        id="fillMobile"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                     >
                        <stop
                           offset="5%"
                           stopColor="var(--color-mobile)"
                           stopOpacity={0.8}
                        />
                        <stop
                           offset="95%"
                           stopColor="var(--color-mobile)"
                           stopOpacity={0.1}
                        />
                     </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis
                     dataKey="date"
                     tickLine={false}
                     axisLine={false}
                     tickMargin={8}
                     minTickGap={32}
                     tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                           month: "short",
                           day: "numeric",
                        });
                     }}
                  />
                  <ChartTooltip
                     cursor={false}
                     content={
                        <ChartTooltipContent
                           labelFormatter={(value) => {
                              return new Date(value).toLocaleDateString(
                                 "en-US",
                                 {
                                    month: "short",
                                    day: "numeric",
                                 }
                              );
                           }}
                           indicator="dot"
                        />
                     }
                  />
                  <Area
                     dataKey="mobile"
                     type="natural"
                     fill="url(#fillMobile)"
                     stroke="var(--color-mobile)"
                     stackId="a"
                  />
                  <Area
                     dataKey="desktop"
                     type="natural"
                     fill="url(#fillDesktop)"
                     stroke="var(--color-desktop)"
                     stackId="a"
                  />
                  <ChartLegend content={<ChartLegendContent />} />
               </AreaChart>
            </ChartContainer> */}
         </CardContent>
      </Card>
   );
}
