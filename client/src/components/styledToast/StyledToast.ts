"use client";
import toast from "react-hot-toast";

export const styledSuccessToast = (message: string) => {
  return toast.success(message, {
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
};

export const styledErrorToast = (message: string) => {
  return toast.error(message, {
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
};
