import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Code } from '../../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Single-byte XOR cipher
      </h2>
      <div className='flex flex-col gap-2'>
        <p>The hex encoded string:</p>
        <Code
          lines={[
            '1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736'
          ]}
        />
        <p>... has been XOR'd against a single character. Find the key, decrypt the message.</p>
        <p>You can do this by hand. But don't: write code to do it for you.</p>
        <p>How? Devise some method for "scoring" a piece of English plaintext. Character frequency is a good metric. Evaluate each output and choose the one with the best score.</p>
      </div>
      <Alert className='bg-amber-600/30'>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Achievement Unlocked</AlertTitle>
        <AlertDescription>
          You now have our permission to make "ETAOIN SHRDLU" jokes on Twitter.
        </AlertDescription>
      </Alert>
    </div>
  );
}
