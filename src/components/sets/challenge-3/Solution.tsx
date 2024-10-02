import { TypescriptCodeHighlighter } from '@/components/TypescriptCodeHighlighter';

const set1Challenge3CodeString = require('!!raw-loader!../../../solutions/set-1-challenge-3.ts').default;

export default function Solution() {
  return (
    <div>
      <TypescriptCodeHighlighter
        codeString={set1Challenge3CodeString}
      />
    </div>
  );
}
