"use server";
import { cookies } from "next/headers";

const sessionCookie = cookies().get("videogames_session_token");
const token = sessionCookie?.value.split(",").shift(); //token?.value.split(",").shift() por el max-age

export const fetchUserLibrary = async (
  id: number,
  method: "POST" | "DELETE" | "GET"
) => {
  if (!token) return [];
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/library/${id}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const compareVideogamesInLibrary = async (id: number) => {
  const videogamesLibrary: string[] = (
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/library`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json())
  ).data;

  if (!videogamesLibrary) return false;

  return videogamesLibrary.some(
    (videogame: string) => videogame === String(id)
  );
};
