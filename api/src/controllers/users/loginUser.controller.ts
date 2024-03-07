import Users from "../../models/users.model";
import { generateToken } from "../../utils/jwt";

export default async function loginUserController(
  username: string,
  email: string,
  password: string
) {
  const user = await Users.findOne({
    where: {
      username,
      email,
      password,
    },
  });

  if (!user) throw new Error("The user was not finded");
  else return generateToken({ id: user.id, username, email });
}
