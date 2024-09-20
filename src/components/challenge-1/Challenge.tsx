// 'use client'
// import { useState } from 'react';

// export default function Challenge() {
//   const [count, setCount] = useState(0);
//   return (
//     <div>
//       <p className='flex flex-col gap-72'>
//         Challenge 1
//         <span className='text-purple-600'>I'm a span</span>
//       </p>
//       <button onClick={() => setCount(c => c + 1)}>{count}</button>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';

// Correct implementation for testing user input
const correctHexToBase64 = (hex: string): string => {
  const rawBytes = Buffer.from(hex, 'hex');
  return rawBytes.toString('base64');
};

export default function Challenge() {
  const [count, setCount] = useState(0);
  const [userInput, setUserInput] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // Test user input function
  const testUserCode = () => {
    try {
      const hexString = '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d';
      const expectedBase64 = 'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t';
      
      // Create function from user's input code
      const userFunction = eval(`(${userInput})`);

      // Execute user function with test case
      const userOutput = userFunction(hexString);

      // Compare user output with correct output
      if (userOutput === expectedBase64) {
        setFeedback('Correct! Well done.');
      } else {
        setFeedback(`Incorrect. Your output: ${userOutput}`);
      }
    } catch (error) {
      //Check if the error is an instance of Error
      if (error instanceof Error) {
         setFeedback(`Error in execution: ${error.message}`);
      } else {
        setFeedback(`An unknown error has occured. Huh, that's strange. This has never happened before.`)
      }
     

    }
  };

  return (
    <div>
      {/* Header with count and flex styling */}
      <p className='flex flex-col gap-72'>
        Challenge 1
        <span className='text-purple-600'>I'm a span</span>
      </p>

      {/* Button to increment the count */}
      <button onClick={() => setCount(c => c + 1)}>{count}</button>

      {/* User input textarea */}
      <div style={{ marginTop: '20px' }}>
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your hexToBase64 function here"
          rows={10}
          cols={50}
        />
        <br />
        <button onClick={testUserCode}>Test My Code</button>
      </div>

      {/* Feedback section */}
      <p>{feedback}</p>
    </div>
  );
}

