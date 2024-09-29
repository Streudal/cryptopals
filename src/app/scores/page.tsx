'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { challengeSets } from '@/lib/constants';
import { usePathname } from 'next/navigation';

type ChallengeListPageProps = {
  params: {
    set_id: string;
  }
}

export default function Scores({ params }: ChallengeListPageProps) {
  const pathname = usePathname();
  // const challenges = challengeSets.find((set) => set.id === Number(params.set_id))?.challenges;

  // if (!challenges) return notFound();

  return (
    <div className="flex flex-col gap-10 pt-5">

      <h1 className='text-6xl'>
        Scores
      </h1>

      <div className='flex w-full border border-white rounded-md text-4xl gap-4 p-4'>
        <h3 className=''>Overall Score:</h3>
        <div>
          <span></span>
          <span></span>
        </div>
      </div>
      <Accordion type="single" collapsible className='w-full'>
        {challengeSets.map((set) => (
          <AccordionItem key={`set-${set.id}`} value={set.title}>
            <AccordionTrigger className='text-3xl font-bold'>{set.title}</AccordionTrigger>
            <AccordionContent className='p-8 text-xl'>
              <ul className='flex flex-col gap-6'>
                {set.challenges.map((challenge) => (
                  <li key={`challenge-${challenge.id}`} className='w-full flex justify-between'>
                    <span>{challenge.title}:</span>
                    <div>
                      { } / {challenge.points}
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
