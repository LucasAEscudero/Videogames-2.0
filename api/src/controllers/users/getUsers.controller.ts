import Users from "../../models/users.model";

export default async function getUsersController() {
  const users = await Users.findAll();

  return users;
}
