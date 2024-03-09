import Users from "../../models/users.model";
import { ClientError } from "../../utils/errors";

export default async function postUserVideogameController(
  id: string,
  newVideogameId: string
) {
  const user = await Users.findOne({
    where: { id },
  });

  if (!user) throw new ClientError("Not exist an user with this id", 404);

  if (!user.library) user.set({ library: [newVideogameId] });
  else {
    if (!user.library.find((videogameId) => videogameId === newVideogameId)) {
      user.set({
        library: [...user.library, newVideogameId],
      });
    } else return { error: true };
  }

  await user.save();

  return { error: false };
}
