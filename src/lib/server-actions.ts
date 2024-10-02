'use server'

export async function checkChallenge1(data: FormData) {
  console.log(data)
  console.log('Hello from server!', JSON.stringify(data));
}
