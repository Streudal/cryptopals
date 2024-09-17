import Link from 'next/link';

export function Header() {
  return (
    <header>
      <div className='flex w-full border border-white rounded-md'>
        <div className='flex items-center'>
          <Link href='/'>
            <img className='w-20 h-20' src='/images/CryptopalsLOGO.svg' />
          </Link>
          <h1 className='font-medium text-3xl'>
            Cryptopals Crypto Challenges
          </h1>
        </div>
      </div>
    </header>
  );
}
