import Challenge1 from '@/components/challenge-1';
import { Challenge2 } from '@/components/challenge-2';

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
  return (
    <div>
      <div className='text-red-500 text-7xl'>
        {params.id === '1' && <Challenge1 />}
        {params.id === '2' && <Challenge2 />}
      </div>
    </div>
  );
}
