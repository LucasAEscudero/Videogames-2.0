import Users from "../../models/users.model";
import { generateToken } from "../../utils/jwt";
import { ClientError } from "../../utils/errors";

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

  if (!user) throw new ClientError("This user not exist", 404);
  else return generateToken({ id: user.id, username, email });
}
