import Link from "next/link";
import React from "react";
import ConfettiButton from "@/app/components/ConfettiButton";

export default function Scores() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]"></span> 
          
          <ConfettiButton/>
         <span className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-sm text-white mt-1">click me</span>

        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/"
            //target="_blank" // Include if you want new pages to open in a new tab
            >
            <h3 className="text-2xl font-bold">Homepage →</h3>
            <div className="text-lg">
              Return to the homepage
            </div>
         </Link>

         <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/scores"
            //target="_blank" // Include if you want new pages to open in a new tab
            >
            <h3 className="text-2xl font-bold">Score →</h3>
            <div className="text-lg">
              Return to the Score page
            </div>
         </Link>
        </div>
      </div>
    </main>
  );
}
