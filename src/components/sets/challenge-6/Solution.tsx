import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge6CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-6.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge6CodeString}
      />
    </div>
  );
}
