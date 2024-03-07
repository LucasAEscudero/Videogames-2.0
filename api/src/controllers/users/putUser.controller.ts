import Users from "../../models/users.model";

export default async function putUserController(
  id: string,
  username: string,
  email: string,
  password: string
) {
  const userData = await Users.findOne({ where: { id } });

  if (!userData) throw new Error("The user could not be edited");

  userData.set({
    username,
    email,
    password,
  });

  await userData.save();
}
