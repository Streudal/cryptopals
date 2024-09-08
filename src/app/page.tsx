import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Cryptopal challenges</span> 
          
        </h1>
        <h3 className="text-2xl font-bold">
        <ol>
            <li>1. Convert hex to base64</li>
            <li>2. Fixed XOR</li>
            <li>3. Single-byte XOR cipher</li>
            <li>4. Detect single-character</li>
            <li>5. Implement repeating-key XOR</li>
            <li>6. Break repeating-key XOR</li>
            <li>7. AES in ECB mode</li>
            <li>8. Detect AES in ECB mode</li>
          </ol>
          </h3>


        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">

        <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/scores"
            //target="_blank" // Include if you want new pages to open in a new tab
          >
            <h3 className="text-2xl font-bold">Score →</h3>
            <div className="text-lg">
              If you already finished, you can see your score again here.
            </div>
          </Link>

          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/challenges"
            //target="_blank" // Include if you want new pages to open in a new tab
            >
            <h3 className="text-2xl font-bold">Challenges →</h3>
            <div className="text-lg">
              Click here to start the first challenge.
            </div>
          </Link>
          
        </div>
      </div>
    </main>
  );
}
