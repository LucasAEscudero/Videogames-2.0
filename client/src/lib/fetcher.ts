"use server";
export default async function fetcher(url: string) {
  return await fetch(url)
    .then((res) => res.json())
    .catch((error) => console.log(error));
}
