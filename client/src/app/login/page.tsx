"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Input, Link } from "@nextui-org/react";

type FormData = {
  identifier: string;
  password: string;
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <section className="flex justify-center">
      <div className="flex flex-col justify-center gap-7 bg-[#18181b] rounded-xl w-[20em] p-5 mt-[1em]">
        <h2 className="text-2xl text-center">Log In</h2>
        <form onSubmit={onSubmit} className="flex flex-col">
          {/* username */}
          <Input
            label="Username/Email"
            isRequired
            size="md"
            {...register("identifier", {
              required: "Username or email is required",
              minLength: {
                value: 3,
                message: "Should be more long",
              },
            })}
          />
          {errors.identifier && (
            <p className="text-red-800 text-sm">*{errors.identifier.message}</p>
          )}

          {/* email */}
          <Input
            label="Password"
            isRequired
            size="md"
            className="mt-5"
            {...register("password", {
              required: "The password is required",
              minLength: {
                value: 3,
                message: "Should be more long",
              },
              maxLength: {
                value: 20,
                message: "Should be more short",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-800 text-sm">*{errors.password.message}</p>
          )}

          <Button type="submit" className="mt-5">
            Register
          </Button>
        </form>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <Link href="/signup" size="sm">
            Register here!
          </Link>
        </p>
      </div>
    </section>
  );
}
