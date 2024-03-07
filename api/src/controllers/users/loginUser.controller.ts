import Users from "../../models/users.model";

export default async function loginUserController(
  username: string,
  email: string,
  password: string
) {
  const user = Users.findOne({
    where: {
      username,
      email,
      password,
    },
  });

  if (!user) throw new Error("The user was not finded");
  else return user;
}
