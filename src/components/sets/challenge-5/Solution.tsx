import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge5CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-5.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge5CodeString}
      />
    </div>
  );
}
