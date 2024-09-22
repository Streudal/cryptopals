'use client'
import { useState } from 'react';

export default function Challenge() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p className='flex flex-col gap-72'>
        Challenge 3
      </p>
    </div>
  );
}
