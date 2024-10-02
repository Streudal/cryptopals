import { Badge } from '@/components/ui/badge';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function TypescriptCodeHighlighter({
  codeString
}: {
  codeString: string;
}) {
  return (
    <div className='relative'>
      <Badge className='absolute -top-2 left-2'>typescript</Badge>
      <SyntaxHighlighter
        language="typescript"
        showLineNumbers
        style={nightOwl}
      >
        {codeString}
      </SyntaxHighlighter>
    </div>
  )
}
