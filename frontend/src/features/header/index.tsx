export default function Header() {
   return (
      <header className="h-14 flex items-center px-8 space-x-16 bg-neutral-100">
         <h1 className="font-bold tracking-tight text-3xl">
            <a href="https://alloan.ai/" className="text-[hsl(280,100%,70%)]">
               alloan.ai
            </a>
         </h1>

         <ul className="flex text-xl space-x-4 items-center">
            <li className="hover:text-neutral-700">home</li>
            <li className="hover:text-neutral-700">team</li>
         </ul>
      </header>
   );
}
