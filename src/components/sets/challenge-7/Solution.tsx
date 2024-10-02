import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge7CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-7.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge7CodeString}
      />
    </div>
  );
}
