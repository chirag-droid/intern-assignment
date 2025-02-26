export default function Header() {
   // const clearCache = () => {
   //    client.post("/debug/clearCache");
   // };

   return (
      <header className="h-12 md:h-14 md:px-6 flex items-center px-4 bg-neutral-100">
         <h1 className="font-bold tracking-tight text-2xl md:text-3xl flex-1">
            <a href="https://alloan.ai/" className="text-[hsl(280,100%,70%)]">
               alloan.ai
            </a>
         </h1>

         <ul className="flex text-lg space-x-4 md:text-xl items-center flex-1 justify-end">
            <li className="hover:text-neutral-700">home</li>
            <li className="hover:text-neutral-700">team</li>
         </ul>

         {/* <Button onClick={clearCache}>Clear Cache</Button> */}
      </header>
   );
}
