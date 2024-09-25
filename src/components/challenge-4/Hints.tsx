import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function Hints() {
  return (
    <Alert className='bg-amber-600/30'>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Hint</AlertTitle>
      <AlertDescription>
        Your code from #3 should help 😉
      </AlertDescription>
    </Alert>
  );
}
