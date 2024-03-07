import { sign, verify } from "jsonwebtoken";

export const generateToken = (user: object) => {
  const jwt: string = sign({ ...user }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });

  return jwt;
};

export const verifyToken = (token: string) => {
  const isOk = verify(token, process.env.JWT_SECRET as string);

  return isOk;
};
