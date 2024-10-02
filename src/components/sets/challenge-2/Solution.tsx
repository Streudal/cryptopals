import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge2CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-2.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge2CodeString}
      />
    </div>
  );
}
