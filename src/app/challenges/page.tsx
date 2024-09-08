import Link from "next/link";

export default function Challenge() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Crypto Challenge Set 1</span> 
          <h3 className="text-2xl font-semibold tracking-widest"> This is the qualifying set. We picked the exercises in it to ramp developers up gradually into coding cryptography, but also to verify that we were working with people who were ready to write code.

This set is relatively easy. With one exception, most of these exercises should take only a couple minutes. But don't beat yourself up if it takes longer than that. It took Alex two weeks to get through the set!

If you've written any crypto code in the past, you're going to feel like skipping a lot of this. Don't skip them. At least two of them (we won't say which) are important stepping stones to later attacks. </h3>
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/"
            //target="_blank" // Include if you want new pages to open in a new tab
          >
            <h3 className="text-2xl font-bold">Back</h3>
            <div className="text-lg">
              
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/challenges/1"
            //target="_blank" // Include if you want new pages to open in a new tab
            >
            <h3 className="text-2xl font-bold">Next</h3>
            <div className="text-lg">
              
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
