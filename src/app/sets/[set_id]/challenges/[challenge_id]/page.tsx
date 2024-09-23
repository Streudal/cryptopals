'use client'
import Challenge1 from '@/components/challenge-1/Challenge';
import Challenge2 from '@/components/challenge-2/Challenge';
import Challenge3 from '@/components/challenge-3/Challenge';
import Challenge4 from '@/components/challenge-4/Challenge';
import Challenge5 from '@/components/challenge-5/Challenge';
import Challenge6 from '@/components/challenge-6/Challenge';
import Challenge7 from '@/components/challenge-7/Challenge';
import Challenge8 from '@/components/challenge-8/Challenge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChallegeList, challengeSets } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { notFound, useParams, usePathname, useRouter } from 'next/navigation';

type ChallengePageProps = {
  params: {
    challenge_id: string;
  }
}

type ChallengePagePathParams = {
  set_id: string;
  challenge_id: string;
}

function findMinMaxIdField(arr?: ChallegeList[]): { minValue: number, maxValue: number } {
  const field = 'id';

  if (!arr) {
    return {
      minValue: 1,
      maxValue: 1
    }
  }

  let minValue = arr[0]?.[field] ?? 1;
  let maxValue = arr[0]?.[field] ?? 1;

  for (const item of arr) {
    if (item[field] < minValue) {
      minValue = item[field];
    }
    if (item[field] > maxValue) {
      maxValue = item[field];
    }
  }

  return { minValue, maxValue };
}

/**
 * Shared scren for challenges. All code here will be mostly the same for all challenges but need to pass in props/components
 * so that the details and content of the page are different depending on the challenge (see params in url) the user is on.
 */
export default function ChallengePage({
  params
}: ChallengePageProps) {
  const pathname = usePathname();
  const pathParams = useParams<ChallengePagePathParams>();
  const router = useRouter();
  const selectedChallengeSet = challengeSets.find((challengeSet) => String(challengeSet.id) === pathParams.set_id);
  const setChallenges = selectedChallengeSet?.challenges;
  const { minValue, maxValue } = findMinMaxIdField(setChallenges);
  const isPreviousDisabled = pathParams.challenge_id === String(minValue);
  const prevUrl = `/sets/${pathParams.set_id}/challenges/${Number(pathParams.challenge_id) - 1}`;
  const isNextDisabled = pathParams.challenge_id === String(maxValue);
  const nextUrl = `/sets/${pathParams.set_id}/challenges/${Number(pathParams.challenge_id) + 1}`;

  const handleChallengeSetSelection = (setId: string) => {
    router.push(`/sets/${setId}/challenges/1`);
  }

  if (!selectedChallengeSet) return notFound();

  return (
    <main className='grid grid-cols-8 gap-4 pt-4'>
      <div className='col-span-1 flex flex-col items-center gap-8 border border-white rounded-md p-2'>
        <Select defaultValue={`${selectedChallengeSet.id}`} onValueChange={handleChallengeSetSelection}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a challenge set" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {challengeSets.map((set) => (
                <SelectItem key={set.id} value={`${set.id}`}>
                  {set.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='w-full flex flex-col gap-2'>
          {setChallenges?.map((challenge) => (
            <Link
              key={challenge.id}
              className={cn(
                'text-center p-4 rounded-md hover:bg-slate-600/25',
                String(challenge.id) === pathParams.challenge_id && 'bg-slate-600/25'
              )}
              href={`/sets/${pathParams.set_id}/challenges/${challenge.id}`}
            >
              {challenge.title}
            </Link>
          ))}
        </div>
      </div>
      <div className='col-span-7 flex flex-col text-red-500 text-7xl outline-dashed outline-purple-500'>
        <div className='grid grid-cols-2 grid-rows-2 gap-4 h-full p-2'>
          <div className='outline outline-yellow-200'>
            {params.challenge_id === '1' && <Challenge1 />}
            {params.challenge_id === '2' && <Challenge2 />}
            {params.challenge_id === '3' && <Challenge3 />}
            {params.challenge_id === '4' && <Challenge4 />}
            {params.challenge_id === '5' && <Challenge5 />}
            {params.challenge_id === '6' && <Challenge6 />}
            {params.challenge_id === '7' && <Challenge7 />}
            {params.challenge_id === '8' && <Challenge8 />}
          </div>
          <div className='outline outline-yellow-200'>
            Guess Input and submit buttton
          </div>
          <div className='outline outline-yellow-200'>
            Feedback/Hints
          </div>
          <div className='outline outline-yellow-200'>
            Show me solution
          </div>
        </div>
        <div className='flex justify-between p-4'>
          <Button disabled={isPreviousDisabled} asChild>
            <Link href={prevUrl}>
              Previous
            </Link>
          </Button>
          <Button disabled={isNextDisabled} asChild>
            <Link href={nextUrl}>
              Next
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
