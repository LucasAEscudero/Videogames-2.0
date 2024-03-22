import { Op } from "sequelize";
import Users from "../../models/users.model";
import { ClientError } from "../../utils/errors";

export default async function registerUserController(
  username: string,
  email: string,
  password: string
) {
  const alreadyExists = await Users.findOne({
    where: { [Op.or]: [{ username }, { email }] },
  });

  if (alreadyExists) {
    if (alreadyExists.username === username)
      throw new ClientError(`The username ${username} already exists`);
    else if (alreadyExists.email === email)
      throw new ClientError(`The user with the email ${email} already exists`);
  }

  const userCreated = await Users.create({
    username,
    email,
    password,
  });

  if (!userCreated) throw new Error("Error to create the new user");
  else return userCreated;
}
