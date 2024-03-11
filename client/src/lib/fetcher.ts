"use server";

export default async function fetcher(url: string) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });
}
