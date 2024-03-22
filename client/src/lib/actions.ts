"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";

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

    decodedToken("videogames_session_token");

    return { error: false, message: "Login successfully" };
  }
}

// redirect function
export async function redirectPage(path: string) {
  redirect(path);
}

// decodedToken
type userPayloadTokenType = JwtPayload & {
  id: string;
  username: string;
  email: string;
};

export async function decodedToken(tokenName: string) {
  const tokenCookie = cookies().get("videogames_session_token");

  if (tokenCookie) {
    const { id, username, email } = jwtDecode<userPayloadTokenType>(
      tokenCookie.value
    );

    return { id, username, email };
  }
}

export const deleteCookie = async (cookieName: string) =>
  cookies().delete(cookieName);
