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
      <AlertTitle>No, that's not a mistake.</AlertTitle>
      <AlertDescription>
        We get more tech support questions for this challenge than any of the other ones. We promise, there aren't any blatant errors in this text. In particular: the "wokka wokka!!!" edit distance really is 37.
      </AlertDescription>
    </Alert>
  );
}
