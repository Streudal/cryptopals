
export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Detect single-character XOR
      </h2>
      <div className='flex flex-col gap-2'>
        <p>One of the 60-character strings <a className='text-blue-400 hover:cursor-pointer hover:underline' href='/assets/set-1-challenge-data-4.txt' target='_blank'>in this file</a> has been encrypted by single-character XOR.</p>
        <p>Find it.</p>
      </div>
    </div>
  );
}
