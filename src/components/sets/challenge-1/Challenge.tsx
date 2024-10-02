import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Code } from '../../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Convert hex to base64
      </h2>
      <div className='flex flex-col gap-2'>
        <p>The string:</p>
        <Code
          lines={[
            '49276d206b696c6c696e6720796f757220627261696e206c696b65206120706f69736f6e6f7573206d757368726f6f6d'
          ]}
        />
        <p>Should produce:</p>
        <Code
          lines={[
            'SSdtIGtpbGxpbmcgeW91ciBicmFpbiBsaWtlIGEgcG9pc29ub3VzIG11c2hyb29t'
          ]}
        />
        <p>
          So go ahead and make that happen. You'll need to use this code for the rest of the exercises.
        </p>
      </div>
      <Alert className='bg-amber-600/30'>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Cryptopals Rule</AlertTitle>
        <AlertDescription>
          Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.
        </AlertDescription>
      </Alert>
    </div>
  );
}
