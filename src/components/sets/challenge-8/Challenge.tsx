
export default function Challenge() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-3xl font-bold text-center'>
        Detect AES in ECB mode
      </h2>
      <div className='flex flex-col gap-2'>
        <p><a className='text-blue-400 hover:cursor-pointer hover:underline' href='/assets/set-1-challenge-data-8.txt' target='_blank'>In this file</a> are a bunch of hex-encoded ciphertexts.</p>
        <p>One of them has been encrypted with ECB.</p>
        <p>Detect it.</p>
        <p>Remember that the problem with ECB is that it is stateless and deterministic; the same 16 byte plaintext block will always produce the same 16 byte ciphertext.</p>
      </div>
    </div>
  );
}
