import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { challengeSets } from '@/lib/constants';
import Link from 'next/link';

/**
 * Challenge card list page.
 */
export default function ChallengesList() {
  return (
    <div className="">
      <h1 className='text-6xl'>
        Challenge Sets
      </h1>
      <div className='grid grid-cols-2'>
        {challengeSets.map((challengeSet) => (
          <Card key={challengeSet.id} className={"w-[380px]"}>
            <CardHeader>
              <CardTitle>{challengeSet.title}</CardTitle>
              <CardDescription>{challengeSet.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/challenges/${challengeSet.id}`}>Start</Link>
              </Button>
            </CardFooter>
          </Card>))}
      </div>
    </div>
  );
}
