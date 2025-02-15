import "@/styles/globals.css";
import store from "@/app/store";
import Header from "@/features/header";
import { fetchTrendingStocks } from "@/features/trending-stocks/slice";
import TrendingStocks from "@/features/trending-stocks";

store.dispatch(fetchTrendingStocks());

function App() {
   return (
      <>
         <Header />
         <main className="px-8 space-y-6 py-6">
            <TrendingStocks />
         </main>
      </>
   );
}

export default App;
