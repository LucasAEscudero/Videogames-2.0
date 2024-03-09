import Users from "../../models/users.model";
import { ClientError } from "../../utils/errors";

export default async function putUserController(
  id: string,
  username: string,
  email: string,
  password: string
) {
  const userData = await Users.findOne({ where: { id } });

  if (!userData) throw new ClientError("The user with this id not exist", 404);

  userData.set({
    username,
    email,
    password,
  });

  await userData.save();
}
