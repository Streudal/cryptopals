'use client'
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { challengeSets } from '@/lib/constants';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';

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
	const searchParams = useSearchParams();
	const selectedChallengeSet = challengeSets.find((challengeSet) => String(challengeSet.id) === params.id);

	if (!selectedChallengeSet) return notFound();

	const updateSelectedChallengeSet = (challengeSet: string) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set('set', challengeSet);
		window.history.pushState(null, '', `?${params.toString()}`);
	}

	return (
		<main className='grid grid-cols-8 gap-4 pt-4'>
			<div className='col-span-1 flex justify-center outline-dashed outline-green-500 p-2'>
				<Select defaultValue='challenge-1' onValueChange={updateSelectedChallengeSet}>
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
			<div className='col-span-7 flex flex-col text-red-500 text-7xl outline-dashed outline-purple-500'>
				<div className='grid grid-cols-2 grid-rows-2 gap-4 h-full p-2'>
					<div className='outline outline-yellow-200'>
						Problem Content
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
					<Button asChild>
						<Link href={``}>
							Previous
						</Link>
					</Button>
					<Button>
						<Link href={``}>
							Next
						</Link>
					</Button>
				</div>
				{/* {params.id === '1' && <Challenge1 />}
				{params.id === '2' && <Challenge2 />} */}
			</div>
		</main>
	);
}
