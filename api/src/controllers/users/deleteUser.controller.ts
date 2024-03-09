import Users from "../../models/users.model";
import { ClientError } from "../../utils/errors";

export default async function deleteUserController(id: string) {
  const deleted = await Users.destroy({
    where: {
      id,
    },
  });

  if (!deleted) throw new ClientError("The user with this id not exist", 404);
}
