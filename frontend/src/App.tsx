import "@/styles/globals.css";
import store from "@/app/store";
import Header from "@/features/header";
import { fetchTrendingStocks } from "@/features/trending-stocks/slice";
import TrendingStocks from "@/features/trending-stocks";
import StockSelection from "@/features/stock-selection";
import { fetchStocks } from "./features/stock-selection/slice";
import StockPriceGraph from "./features/stock-price-graph";

store.dispatch(fetchTrendingStocks());
store.dispatch(fetchStocks());

function App() {
   return (
      <>
         <Header />
         <main className="px-8 space-y-6 py-6">
            <TrendingStocks />

            <section>
               <div className="flex space-x-4">
                  <h1 className="text-2xl font-medium">Selected Stock</h1>
                  <StockSelection />
               </div>

               <div className="py-4">
                  <StockPriceGraph />
               </div>
            </section>
         </main>
      </>
   );
}

export default App;
