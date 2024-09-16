import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { challengeSets } from '@/lib/constants';
import { Lock } from "lucide-react";
import Link from 'next/link';

/**
 * Challenge card list page.
 */
export default function ChallengesList() {
  return (
    <div className="flex flex-col gap-10 pt-5">

      <h1 className='text-6xl'>
        Challenge Sets
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
                  <Link href={`/challenges/${challengeSet.id}`}>
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
