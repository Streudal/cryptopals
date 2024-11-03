import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Code } from '../../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Break repeating-key XOR
      </h2>
      <div className='flex flex-col gap-2'>
        <Alert variant='destructive'>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>It is officially on, now.</AlertTitle>
          <AlertDescription>
            This challenge isnt conceptually hard, but it involves actual error-prone coding. The other challenges in this set are there to bring you up to speed. This one is there to <b>qualify</b> you. If you can do this one, you're probably just fine up to Set 6.
          </AlertDescription>
        </Alert>
        <p><a className='text-blue-400 hover:cursor-pointer hover:underline' href='/assets/set-1-challenge-data-6.txt' target='_blank'>There's a file here.</a> It's been base64'd after being encrypted with repeating-key XOR.</p>
        <p>Decrypt it.</p>
        <p>Here's how:</p>
        <ol className='list-decimal pl-10'>
          <li>
            <p>Let KEYSIZE be the guessed length of the key; try values from 2 to (say) 40.</p>
          </li>
          <li>
            <p>Write a function to compute the edit distance/Hamming distance between two strings. <i>The Hamming distance is just the number of differing bits</i>. The distance between:</p>
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
            <p>is <b>37</b>. <i>Make sure your code agrees before you proceed</i>.</p>
          </li>
          <li>
            For each KEYSIZE, take the <i>first</i> KEYSIZE worth of bytes, and the <i>second</i> KEYSIZE worth of bytes, and find the edit distance between them. Normalize this result by dividing by KEYSIZE.
          </li>
          <li>
            The KEYSIZE with the smallest normalized edit distance is probably the key. You could proceed perhaps with the smallest 2-3 KEYSIZE values. Or take 4 KEYSIZE blocks instead of 2 and average the distances.
          </li>
          <li>
            Now that you probably know the KEYSIZE: break the ciphertext into blocks of KEYSIZE length.
          </li>
          <li>
            Now transpose the blocks: make a block that is the first byte of every block, and a block that is the second byte of every block, and so on.
          </li>
          <li>
            Solve each block as if it was single-character XOR. You already have code to do this.
          </li>
          <li>
            For each block, the single-byte XOR key that produces the best looking histogram is the repeating-key XOR key byte for that block. Put them together and you have the key.
          </li>
        </ol>
        <p>
          This code is going to turn out to be surprisingly useful later on. Breaking repeating-key XOR ("Vigenere") statistically is obviously an academic exercise, a "Crypto 101" thing. But more people "know how" to break it than can <i>actually break it</i>, and a similar technique breaks something much more important.
        </p>
      </div>
      <Alert className='bg-amber-600/30'>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>No, that's not a mistake.</AlertTitle>
        <AlertDescription>
          We get more tech support questions for this challenge than any of the other ones. We promise, there aren't any blatant errors in this text. In particular: the "wokka wokka!!!" edit distance really is 37.
        </AlertDescription>
      </Alert>
    </div>
  );
}
