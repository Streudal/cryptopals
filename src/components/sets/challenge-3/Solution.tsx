'use client'
import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';
import { Button } from '@/components/ui/button';
import { getItem, saveItem } from '@/lib/utils';
import { useState } from 'react';

const codeString = require('!!raw-loader!../../../solutions/set-1-challenge-3.ts').default;
const storageKey = 'Set 1 -- Challenge 3';

export default function Solution() {
  const savedStorageValues = JSON.parse(getItem(storageKey) as any);
  const [isSolutionShown, setIsSolutionShown] = useState(savedStorageValues?.solved ?? false);

  return (
    <div className='flex flex-col gap-8'>
      {!isSolutionShown && <div className='flex flex-row gap-10 self-center'>
        <Button onClick={() => {
          saveItem(storageKey, JSON.stringify({
            value: 1,
            solved: true
          }));
          setIsSolutionShown(true);
        }}
        >
          I solved it! 🎉
        </Button>
        <Button onClick={() => {
          saveItem(storageKey, JSON.stringify({
            value: 0,
            solved: false
          }));
          setIsSolutionShown(true);
        }}
        >
          I can't figure it out 😭
        </Button>
      </div>}
      {isSolutionShown && <TypescriptCodeHighlighter
        codeString={codeString}
      />}
    </div>
  );
}
