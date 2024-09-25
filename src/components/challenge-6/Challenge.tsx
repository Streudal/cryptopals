import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Code } from '../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Break repeating-key XOR
      </h2>
      <div className='flex flex-col gap-2'>
        <Alert className='bg-amber-600/30'>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>It is officially on, now.</AlertTitle>
          <AlertDescription>
            This challenge isn't conceptually hard, but it involves actual error-prone coding. The other challenges in this set are there to bring you up to speed. This one is there to <b>qualify</b> you. If you can do this one, you're probably just fine up to Set 6.
          </AlertDescription>
        </Alert>
        <p><a className='text-blue-400 hover:cursor-pointer hover:underline' href='/assets/set-1-challenge-data-6.txt' target='_blank'>There's a file here.</a> It's been base64'd after being encrypted with repeating-key XOR.</p>
        <p>Decrypt it.</p>
        <p>Here's how:</p>
        <ol>
          <li>
            <p>Let KEYSIZE be the guessed length of the key; try values from 2 to (say) 40.</p>
          </li>
          <li>
            <p>Write a function to compute the edit distance/Hamming distance between two strings. The Hamming distance is just the number of differing bits. The distance between:</p>
            <Code
              lines={[
                'this is a test'
              ]}
            />
            <p>and</p>
            <Code
              lines={[
                'wokka wokka!!!'
              ]}
            />
            <p>is <b>37</b>. Make sure your code agrees before you proceed.</p>
          </li>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
          <li>

          </li>
        </ol>
        <Code
          lines={[
            `Burning 'em, if you ain't quick and nimble`,
            'I go crazy when I hear a cymbal'
          ]}
        />
        <p>Encrypt it, under the key "ICE", using repeating-key XOR.</p>
        <p>In repeating-key XOR, you'll sequentially apply each byte of the key; the first byte of plaintext will be XOR'd against I, the next C, the next E, then I again for the 4th byte, and so on.</p>
        <p>It should come out to:</p>
        <Code
          lines={[
            '0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272',
            'a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f'
          ]}
        />
        <p>Encrypt a bunch of stuff using your repeating-key XOR function. Encrypt your mail. Encrypt your password file. Your .sig file. Get a feel for it. I promise, we aren't wasting your time with this.</p>
      </div>
    </div>
  );
}
