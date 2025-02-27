import "@/styles/globals.css";
import store from "@/app/store";
import TrendingStocks from "@/features/trending-stocks";
import { fetchTrendingStocks } from "@/features/trending-stocks/slice";
import StockGraphs from "@/features/stock-graphs";
import { fetchStocks } from "@/features/all-stocks/slice";

store.dispatch(fetchTrendingStocks());
store.dispatch(fetchStocks());

function App() {
   return (
      <>
         <main className="px-6 space-y-2 md:space-y-3 py-4 md:px-8">
            <TrendingStocks />
            <StockGraphs />
         </main>
      </>
   );
}

export default App;
