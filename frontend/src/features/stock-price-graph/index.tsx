import {
   Card,
   CardHeader,
   CardTitle,
   CardDescription,
   CardContent,
} from "@/components/ui/card";

export default function StockPriceGraph() {
   return (
      <Card>
         <CardHeader className="flex items-center gap-2 space-y-0 py-5 sm:flex-row">
            <div className="grid flex-1 gap-1 text-center sm:text-left">
               <CardTitle>Area Chart - Interactive</CardTitle>
               <CardDescription>
                  Showing total visitors for the last 3 months
               </CardDescription>
            </div>

            {/* <Select value={timeRange} onValueChange={setTimeRange}>
               <SelectTrigger
                  className="w-[160px] rounded-lg sm:ml-auto"
                  aria-label="Select a value"
               >
                  <SelectValue placeholder="Last 3 months">
                     {parseShorthandDate(timeRange)}
                  </SelectValue>
               </SelectTrigger>
               <SelectContent className="rounded-xl">
                  {stock.available.map((availability) => (
                     <SelectItem key={availability} value={availability}>
                        {parseShorthandDate(availability)}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select> */}
         </CardHeader>
         <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
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
