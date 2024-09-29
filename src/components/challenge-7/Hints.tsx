import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

export default function Hints() {
  return (
    <Alert className='bg-amber-600/30'>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Do this with code.</AlertTitle>
      <AlertDescription>
        You can obviously decrypt this using the OpenSSL command-line tool, but we're having you get ECB working in code for a reason. You'll need it <i>a lot</i> later on, and not just for attacking ECB.
      </AlertDescription>
    </Alert>
  );
}
