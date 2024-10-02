'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { runChallenge1 } from '@/lib/server-actions';

export default async function UserGuess() {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await runChallenge1();
  }

  return (
    <div>
      <div>
        <Label htmlFor="challenge-1-input"></Label>
        <Input id="challenge-1-input" />
      </div>
      <Button type='submit' onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
