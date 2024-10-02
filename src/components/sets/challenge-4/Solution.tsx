import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge4CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-4.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge4CodeString}
      />
    </div>
  );
}
