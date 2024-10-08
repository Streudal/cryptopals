import { Button } from '@/components/ui/button';
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-prussian-blue text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-sky-blue">
            Cryptopal Crypto Challenges
          </span>
        </h1>
        <Button
          // className='text-azure-web bg-midnight-green hover:bg-midnight-green/95 text-xl' variant='outline' 
          asChild
        >
          <Link href="/sets">Get Started</Link>
        </Button>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="/scores"
          >
            <h3 className="text-2xl font-bold">My Score</h3>
            <div className="text-lg">
              View your score from completed challenges!
            </div>
          </Link>
          <Link
            className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            href="https://cryptopals.com/"
            target="_blank"
          >
            <h3 className="text-2xl font-bold">Original Site</h3>
            <div className="text-lg">
              See to the original crypto challenges site to learn about it's history and background.
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
