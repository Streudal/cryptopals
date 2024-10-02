import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Code } from '../../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        AES in ECB mode
      </h2>
      <div className='flex flex-col gap-2'>
        <p>The Base64-encoded content <a className='text-blue-400 hover:cursor-pointer hover:underline' href='/assets/set-1-challenge-data-7.txt' target='_blank'>in this file</a> has been encrypted via AES-128 in ECB mode under the key</p>
        <Code
          lines={[
            `"YELLOW SUBMARINE".`,
          ]}
        />
        <p>(case-sensitive, without the quotes; exactly 16 characters; I like "YELLOW SUBMARINE" because it's exactly 16 bytes long, and now you do too).</p>
        <p>Decrypt it. You know the key, after all.</p>
        <p>Easiest way: use OpenSSL::Cipher and give it AES-128-ECB as the cipher.</p>
      </div>
      <Alert className='bg-amber-600/30'>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Do this with code.</AlertTitle>
        <AlertDescription>
          You can obviously decrypt this using the OpenSSL command-line tool, but we're having you get ECB working in code for a reason. You'll need it <i>a lot</i> later on, and not just for attacking ECB.
        </AlertDescription>
      </Alert>
    </div>
  );
}
