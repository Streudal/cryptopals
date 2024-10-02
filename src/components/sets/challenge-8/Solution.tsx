import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge8CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-8.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge8CodeString}
      />
    </div>
  );
}
