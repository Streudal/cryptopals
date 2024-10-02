import { z } from 'zod';

export const challengeFormSchema = z.object({
  setId: z.number().min(1).max(8),
  challengeId: z.number().min(1).max(8),
  userGuess: z.string().min(1, {
    message: "Input is required.",
  }),
});
