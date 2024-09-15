'use client'
import { useState } from 'react';

export default function Challenge1() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>Challenge 1</p>
      <button onClick={() => setCount(c => c + 1)}>{count}</button>
    </div>
  );
}
