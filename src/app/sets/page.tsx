'use client'
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { challengeSets } from '@/lib/constants';
import { Lock } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SetsList() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-10 pt-5">
      <h1 className='text-6xl'>
        Sets
      </h1>
      <div className='grid grid-cols-1 gap-4 justify-items-center place-self-center md:grid-cols-2'>
        {challengeSets.map((challengeSet) => {
          const isLocked = challengeSet.id !== 1;

          return (
            <Card key={challengeSet.id} className="w-96">
              <CardHeader>
                <CardTitle className='flex justify-between'>
                  {challengeSet.title}
                  {isLocked && <Lock />}
                </CardTitle>
                <CardDescription>{challengeSet.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full" disabled={isLocked}>
                  <Link href={`${pathname}/${challengeSet.id}/challenges`}>
                    {isLocked ? 'Locked' : 'Start'}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
