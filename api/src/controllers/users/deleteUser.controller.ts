import Users from "../../models/users.model";

export default async function deleteUserController(id: string) {
  const deleted = await Users.destroy({
    where: {
      id,
    },
  });

  if (!deleted) throw new Error("The user was not deleted");
}
