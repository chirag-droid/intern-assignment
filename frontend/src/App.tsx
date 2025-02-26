import "@/styles/globals.css";
import store from "@/app/store";
import Header from "@/features/header";
import TrendingStocks from "@/features/trending-stocks";
import { fetchTrendingStocks } from "@/features/trending-stocks/slice";
import StockGraphs from "@/features/stock-graphs";
import { fetchStocks } from "@/features/all-stocks/slice";

store.dispatch(fetchTrendingStocks());
store.dispatch(fetchStocks());

function App() {
   return (
      <>
         <Header />
         <main className="px-4 space-y-2 md:space-y-3 py-3 md:px-6">
            <TrendingStocks />
            <StockGraphs />
         </main>
      </>
   );
}

export default App;
