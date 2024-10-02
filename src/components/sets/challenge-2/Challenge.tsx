import { Code } from '../../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Fixed XOR
      </h2>
      <div className='flex flex-col gap-2'>
        <p>Write a function that takes two equal-length buffers and produces their XOR combination.</p>
        <p>If your function works properly, then when you feed it the string:</p>
        <Code
          lines={[
            '1c0111001f010100061a024b53535009181c'
          ]}
        />
        <p>... after hex decoding, and when XOR'd against:</p>
        <Code
          lines={[
            '686974207468652062756c6c277320657965'
          ]}
        />
        <p>
          ... should produce:
        </p>
        <Code
          lines={[
            '746865206b696420646f6e277420706c6179'
          ]}
        />
      </div>
    </div>
  );
}
