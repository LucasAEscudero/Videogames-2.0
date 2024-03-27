import Users from "../../../models/users.model";
import { generateToken } from "../../../utils/jwt";
import { ClientError } from "../../../utils/errors";
import { Op } from "sequelize";

export default async function loginUserController(
  id: string,
  password: string
) {
  const user = await Users.findOne({
    where: {
      [Op.or]: {
        username: id,
        email: id,
      },
    },
  });

  if (!user) throw new ClientError("This user not exist", 404);
  else if (password !== user.password)
    throw new ClientError("The password is incorrect");

  return generateToken({
    id: user.id,
    email: user.email,
    username: user.username,
  });
}
