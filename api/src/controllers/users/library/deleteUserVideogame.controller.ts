import Users from "../../../models/users.model";
import { ClientError } from "../../../utils/errors";

export default async function deleteUserVideogameController(
  id: string,
  videogameId: string
) {
  const user = await Users.findOne({
    where: { id },
  });

  if (!user) throw new ClientError("Not exist an user with this id", 404);

  if (!user.library)
    throw new ClientError("User library not contain any videogame");
  else if (!user.library.find((videogame) => videogame === videogameId))
    return false;

  const libraryFiltered = user.library.filter(
    (videogame) => videogame !== videogameId
  );

  user.set({
    library: libraryFiltered,
  });

  await user.save();

  return true;
}
