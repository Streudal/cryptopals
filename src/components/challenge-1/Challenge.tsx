'use client'
import { useState } from 'react';

export default function Challenge() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p className='flex flex-col gap-72'>
        Challenge 1
        <span className='text-purple-600'>I'm a span</span>
      </p>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  );
}
