import Users from "../../../models/users.model";
import { ClientError } from "../../../utils/errors";

export default async function getUserVideogamesController(id: string) {
  const user = await Users.findOne({
    where: { id },
  });

  if (!user) throw new ClientError("Not exist an user with this id", 404);
  else if (!user.library) return [];

  return user.library;
}
