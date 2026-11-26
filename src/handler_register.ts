
import { setUser } from "./config";
import { createUser } from "./lib/db/queries/users";

export async function handlerRegister(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <username>`);
  }

  const userName = args[0];

  const user = await createUser(userName);

  setUser(user.name);
  console.log(`User ${user.name} created successfully!`);
  console.log(user);
}