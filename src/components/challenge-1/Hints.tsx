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
      <AlertTitle>Cryptopals Rule</AlertTitle>
      <AlertDescription>
        Always operate on raw bytes, never on encoded strings. Only use hex and base64 for pretty-printing.
      </AlertDescription>
    </Alert>
  );
}
