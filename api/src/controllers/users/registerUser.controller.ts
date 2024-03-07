import { Op } from "sequelize";
import Users from "../../models/users.model";

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
      throw new Error(`The username ${username} already exists`);
    else if (alreadyExists.email === email)
      throw new Error(`The email ${email} already exists`);
  }

  const userCreated = await Users.create({
    username,
    email,
    password,
  });

  if (!userCreated) throw new Error("Error to create the new user");
  else return userCreated;
}
