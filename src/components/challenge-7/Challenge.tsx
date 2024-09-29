import { Code } from '../Code';

export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        AES in ECB mode
      </h2>
      <div className='flex flex-col gap-2'>
        <p>The Base64-encoded content <a className='text-blue-400 hover:cursor-pointer hover:underline' href='/assets/set-1-challenge-data-7.txt' target='_blank'>in this file</a> has been encrypted via AES-128 in ECB mode under the key</p>
        <Code
          lines={[
            `"YELLOW SUBMARINE".`,
          ]}
        />
        <p>(case-sensitive, without the quotes; exactly 16 characters; I like "YELLOW SUBMARINE" because it's exactly 16 bytes long, and now you do too).</p>
        <p>Decrypt it. You know the key, after all.</p>
        <p>Easiest way: use OpenSSL::Cipher and give it AES-128-ECB as the cipher.</p>
      </div>
    </div>
  );
}
