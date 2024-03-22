"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface logInFormActionProps {
  identifier: string;
  password: string;
}

interface signUpFormActionProps {
  username: string;
  email: string;
  password: string;
}

export async function signUpFormAction({
  username,
  email,
  password,
}: signUpFormActionProps) {
  const { message, error } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/signup`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    }
  )
    .then((data) => data.json())
    .catch((err) => console.log(err));

  return { error, message };
}

export async function logInFormAction({
  identifier,
  password,
}: logInFormActionProps) {
  const { message, error } = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ id: identifier, password }),
    }
  )
    .then((data) => data.json())
    .catch((err) => console.log(err));

  if (error) return { error: true, message };
  else {
    const [sessionName, restCookie] = message.split("=");
    const token = restCookie.split(";");

    cookies().set(sessionName, token, {
      secure: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return { error: false, message: "Login successfully" };
  }
}

export async function redirectPage(path: string) {
  redirect(path);
}
