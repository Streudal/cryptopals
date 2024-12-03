'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { challengeSets } from '@/lib/constants';
import { getItem } from '@/lib/utils';
import { useEffect, useState } from 'react';

type ChallengeListPageProps = {
  params: {
    set_id: string;
  }
}

export default function Scores({ params }: ChallengeListPageProps) {
  const [values, setValues] = useState({
    points: 0,
    total: 0
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedPoints = challengeSets.flatMap((set) => set.challenges.flatMap((challenge) => JSON.parse(getItem(`Set ${set.id} -- Challenge ${challenge.id}`) as any)?.value ?? 0));
      const storedTotal = storedPoints.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

      if (storedPoints) {
        setValues({
          points: storedPoints as unknown as number,
          total: storedTotal
        });
      }
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 pt-5">
      <h1 className='text-6xl'>
        Scores
      </h1>
      <div className='flex w-full border border-white rounded-md text-4xl gap-4 p-4'>
        <h3>Overall Score</h3>
        <div className='dot-fill'>
          <div className='flex gap-1'>
            <span>{values.total}</span>
            <span>/</span>
            <span>8</span>
          </div>
        </div>
      </div>
      <Accordion type="single" collapsible className='w-full px-10'>
        {challengeSets.map((set) => (
          <AccordionItem key={`set-${set.id}`} value={set.title}>
            <AccordionTrigger className='text-3xl font-bold'>{set.title}</AccordionTrigger>
            <AccordionContent className='p-8 text-xl'>
              <ul className='flex flex-col gap-6'>
                {set.challenges.length ? set.challenges.map((challenge) => (
                  <li key={`challenge-${challenge.id}`} className='w-full flex justify-between'>
                    <p className='flex gap-4'>
                      <span className='font-bold'>{challenge.title}:</span>
                      <span>{challenge.subTitle}</span>
                    </p>
                    <p className="dot-fill gap-1">
                      <span>{values.points}</span>
                      <span>/</span>
                      <span>{challenge.points}</span>
                    </p>
                  </li>
                )) : <div>
                  <p>No Challenges to Display</p>
                </div>}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
