export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something error";
  }

  return message;
};

export const getErrorName = (error: unknown): string => {
  let name: string;

  if (error instanceof Error) {
    name = error.name;
  } else if (error && typeof error === "object" && "name" in error) {
    name = String(error.name);
  } else if (typeof error === "string") {
    name = error;
  } else {
    name = "Something error";
  }

  return name;
};
