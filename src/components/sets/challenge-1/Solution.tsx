import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge1CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-1.ts').default;

export default function Solution() {
  return (
    <div>
      {/* <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData();
          const value = (document?.getElementById('guess') as HTMLInputElement)?.value;
          formData.append('guess', value);
          checkChallenge1(formData);
        }}
      >
        <div>
          <label>Your Guess Here</label>
          <Input id='guess' />
        </div>
        <Button type="submit" variant='outline'>Submit</Button>
      </form> */}
      <TypescriptCodeHighlighter
        codeString={set1Challenge1CodeString}
      />
    </div>
  );
}
