'use client'
import Challenge1 from '@/components/sets/challenge-1/Challenge';
import Solution1 from '@/components/sets/challenge-1/Solution';
import Challenge2 from '@/components/sets/challenge-2/Challenge';
import Solution2 from '@/components/sets/challenge-2/Solution';
import Challenge3 from '@/components/sets/challenge-3/Challenge';
import Solution3 from '@/components/sets/challenge-3/Solution';
import Challenge4 from '@/components/sets/challenge-4/Challenge';
import Solution4 from '@/components/sets/challenge-4/Solution';
import Challenge5 from '@/components/sets/challenge-5/Challenge';
import Solution5 from '@/components/sets/challenge-5/Solution';
import Challenge6 from '@/components/sets/challenge-6/Challenge';
import Solution6 from '@/components/sets/challenge-6/Solution';
import Challenge7 from '@/components/sets/challenge-7/Challenge';
import Solution7 from '@/components/sets/challenge-7/Solution';
import Challenge8 from '@/components/sets/challenge-8/Challenge';
import Solution8 from '@/components/sets/challenge-8/Solution';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChallegeList, challengeSets } from '@/lib/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { notFound, useParams, usePathname, useRouter } from 'next/navigation';


const isOutlineOn = false;

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
  const areChallengesAvailable = !!setChallenges && setChallenges.length > 0;

  const handleChallengeSetSelection = (setId: string) => {
    router.push(`/sets/${setId}/challenges/1`);
  }

  if (!selectedChallengeSet) return notFound();

  return (
    <main className='grid grid-cols-8 gap-4 pt-4'>
      <div className='col-span-1 flex flex-col items-center gap-8 border border-white rounded-md p-2 h-min'>
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
        <div className='w-full flex flex-col gap-2 min-h-96'>
          {areChallengesAvailable ? setChallenges?.map((challenge) => (
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
          )) : <p className='text-center'>No challenges available.</p>}
        </div>
      </div>
      <div
        className={cn(
          'col-span-7 max-w-6xl justify-self-center flex flex-col text-white text-xl ',
          isOutlineOn && 'outline-dashed outline-purple-500'
        )}
      >
        {areChallengesAvailable && <div className='flex flex-col gap-4 p-2'>
          <div
            className={cn(
              isOutlineOn && 'outline outline-yellow-200'
            )}
          >
            {params.challenge_id === '1' && <Challenge1 />}
            {params.challenge_id === '2' && <Challenge2 />}
            {params.challenge_id === '3' && <Challenge3 />}
            {params.challenge_id === '4' && <Challenge4 />}
            {params.challenge_id === '5' && <Challenge5 />}
            {params.challenge_id === '6' && <Challenge6 />}
            {params.challenge_id === '7' && <Challenge7 />}
            {params.challenge_id === '8' && <Challenge8 />}
          </div>
          <div
            className={cn(
              isOutlineOn && 'outline outline-yellow-200'
            )}
          >
            {params.challenge_id === '1' && <Solution1 />}
            {params.challenge_id === '2' && <Solution2 />}
            {params.challenge_id === '3' && <Solution3 />}
            {params.challenge_id === '4' && <Solution4 />}
            {params.challenge_id === '5' && <Solution5 />}
            {params.challenge_id === '6' && <Solution6 />}
            {params.challenge_id === '7' && <Solution7 />}
            {params.challenge_id === '8' && <Solution8 />}
          </div>
        </div>}
        {!areChallengesAvailable && <div className='flex flex-col gap-4 p-2 items-center'>
          <h2 className='text-3xl font-bold'>Coming Soon</h2>
          <p>These challenges are not yet available. Please come back and check again soon!</p>
        </div>}
        {areChallengesAvailable && <div className='flex justify-between p-4'>
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
        </div>}
      </div>
    </main>
  );
}
