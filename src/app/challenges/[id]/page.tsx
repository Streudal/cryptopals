import Challenge1 from '@/components/challenge-1';
import { Challenge2 } from '@/components/challenge-2';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { challengeSets } from '@/lib/constants';
import { notFound } from 'next/navigation';

type ChallengePageProps = {
  params: {
    id: string;
  }
}

/**
 * Shared scren for challenges. All code here will be mostly the same for all challenges but need to pass in props/components
 * so that the details and content of the page are different depending on the challenge (see params in url) the user is on.
 */
export default function ChallengePage({
  params
}: ChallengePageProps) {
  const selectedChallengeSet = challengeSets.find((challengeSet) => String(challengeSet.id) === params.id);

  if (!selectedChallengeSet) return notFound();

  return (
    <main>
      <div>
        <Select defaultValue='challenge-1'>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a challenge" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {selectedChallengeSet.challenges.map((challenge) => (
                <SelectItem key={challenge.id} value={`challenge-${challenge.id}`}>
                  {challenge.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='text-red-500 text-7xl'>
        {params.id === '1' && <Challenge1 />}
        {params.id === '2' && <Challenge2 />}
      </div>
    </main>
  );
}
