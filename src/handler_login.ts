import { setUser } from "./config";
import { getUser } from "./lib/db/queries/users";

export async function handlerLogin(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (args.length === 0) {
    throw new Error(`usage: ${cmdName} <username>`);
  }

  const userName = args[0];

  const existingUser = await getUser(userName);
  if (!existingUser) {
    throw new Error(`User ${userName} not found`);
  }

  setUser(userName);
  console.log(`User switched successfully to ${userName}!`);
}