import Users from "../../models/users.model";

export default async function postUserVideogameController(
  id: string,
  newVideogameId: string
) {
  const user = await Users.findOne({
    where: { id },
  });

  if (!user) return { error: true };

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
