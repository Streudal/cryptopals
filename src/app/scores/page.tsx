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
        <h3>Overall Score</h3>
        <div className='dot-fill'>
          <div className='flex gap-1'>
            <span></span>
            <span>/</span>
            <span></span>
          </div>
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
                    <p className='flex gap-4'>
                      <span className='font-bold'>{challenge.title}:</span>
                      <span>{challenge.subTitle}</span>
                    </p>
                    <p className="dot-fill">
                      <div className='flex gap-1'>
                        <span>{0}</span>
                        <span>/</span>
                        <span>{challenge.points}</span>
                      </div>
                    </p>
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
