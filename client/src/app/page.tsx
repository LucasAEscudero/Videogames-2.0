"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logIn } from "@/redux/userSlice";
import { getUserData } from "@/lib/user-actions";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const userData = await getUserData();

      if (userData) dispatch(logIn(userData));
    })();
  }, []);

  return <div>Landing page</div>;
}
