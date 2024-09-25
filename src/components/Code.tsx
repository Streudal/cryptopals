export function Code({
  lines
}: {
  lines: string[];
}) {
  return (
    <div className="px-5 py-4 shadow-lg text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-800 rounded-lg leading-normal overflow-hidden">
      <div className="flex flex-col gap-4">
        {lines.map((line, index) => (
          <code key={`${index}:${line}`} className="flex-1 items-center pl-1 overflow-auto">
            {line}
          </code>
        ))}
      </div>
    </div>
  );
}
