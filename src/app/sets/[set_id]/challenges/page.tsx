'use client'
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { challengeSets } from '@/lib/constants';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';

type ChallengeListPageProps = {
  params: {
    set_id: string;
  }
}

export default function ChallengesList({ params }: ChallengeListPageProps) {
  const pathname = usePathname();
  const challenges = challengeSets.find((set) => set.id === Number(params.set_id))?.challenges;

  if (!challenges) return notFound();

  return (
    <div className="flex flex-col gap-10 pt-5">

      <h1 className='text-6xl'>
        Challenges
      </h1>

      <div className='grid grid-cols-1 gap-4 justify-items-center place-self-center md:grid-cols-2'>
        {challenges.map((challenge) => {
          return (
            <Card key={challenge.id} className="w-96">
              <CardHeader>
                <CardTitle className='flex justify-between'>
                  {challenge.title}
                  {/* {isLocked && <Lock />} */}
                </CardTitle>
                <CardDescription>{challenge.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  className="w-full"
                  //  disabled={isLocked} 
                  asChild
                >
                  <Link href={`${pathname}/${challenge.id}`}>
                    Start
                    {/* {isLocked ? 'Locked' : 'Start'} */}
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
