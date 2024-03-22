"use client";
import { useForm } from "react-hook-form";
import { Button, Input, Link } from "@nextui-org/react";
import toast from "react-hot-toast";

import { signUpFormAction, logInFormAction, redirectPage } from "@/lib/actions";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async (data) => {
    const { error, message } = await signUpFormAction({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (error) {
      toast.error(message, {
        style: {
          padding: "12px",
          color: "#fff",
          background: "#27272a",
          border: "1px solid #18181b",
        },
        iconTheme: {
          primary: "#f31260",
          secondary: "#FFFAEE",
        },
      });
    } else {
      toast.success(message, {
        style: {
          padding: "12px",
          color: "#fff",
          background: "#27272a",
          border: "1px solid #18181b",
        },
        iconTheme: {
          primary: "#18c964",
          secondary: "#FFFAEE",
        },
      });
      // login
      await logInFormAction({
        identifier: data.username,
        password: data.password,
      });
      redirectPage("/");
    }
  });

  return (
    <section className="flex justify-center">
      <div className="flex flex-col justify-center gap-7 bg-[#18181b] rounded-xl w-[20em] p-5">
        <h2 className="text-2xl text-center">Sign Up</h2>
        <form onSubmit={onSubmit} className="flex flex-col">
          {/* username */}
          <Input
            label="Username"
            isRequired
            size="md"
            {...register("username", {
              required: "Username is required",
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
          {errors.username && (
            <p className="text-red-800 text-sm">*{errors.username.message}</p>
          )}

          {/* email */}
          <Input
            label="Email"
            isRequired
            size="md"
            className="mt-5"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Should be an email",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-800 text-sm">*{errors.email.message}</p>
          )}

          {/* password */}
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

          {/* confirmPassword */}
          <Input
            label="Confirm password"
            isRequired
            size="md"
            className="mt-5"
            {...register("confirmPassword", {
              required: "Confirm your password is required",
              validate: (value) => {
                if (value === watch("password")) return true;
                else return "Should be equal than password";
              },
            })}
          />
          {errors.confirmPassword && (
            <p className="text-red-800 text-sm">
              *{errors.confirmPassword.message}
            </p>
          )}

          {/* with password input value
          {watch("password") && (
            <>
              <Input
                label="Confirm password"
                isRequired
                size="md"
                placeholder="Confirm your password"
                {...register("confirmPassword", {
                  required: "Confirm your password is required",
                  validate: (value) => {
                    if (value === watch("password")) return true;
                    else return "Should be equal than password";
                  },
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-800 text-sm">
                  *{errors.confirmPassword.message}
                </p>
              )}
            </>
          )} */}

          <Button
            type="submit"
            className="mt-5"
            disabled={
              !watch("username") ||
              !watch("email") ||
              !watch("password") ||
              !watch("confirmPassword")
            }
          >
            Register
          </Button>
        </form>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" size="sm">
            Login here!
          </Link>
        </p>
      </div>
    </section>
  );
}
