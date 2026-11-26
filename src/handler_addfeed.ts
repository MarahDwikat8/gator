import { readConfig } from "./config";
import { createFeed } from "./lib/db/queries/feeds";
import { getUser } from "./lib/db/queries/users";
import type { Feed, User } from "./lib/db/schema";

export async function handlerAddFeed(
  cmdName: string,
  ...args: string[]
): Promise<void> {
  if (args.length !== 2) {
    throw new Error(`usage: ${cmdName} <feed_name> <url>`);
  }

  const feedName = args[0];
  const url = args[1];

  const config = readConfig();
  if (!config.currentUserName) {
    throw new Error("No user is logged in");
  }

  const user = await getUser(config.currentUserName);
  if (!user) {
    throw new Error(`User ${config.currentUserName} not found`);
  }

  const feed = await createFeed(feedName, url, user.id);

  console.log("Feed created successfully:");
  printFeed(feed, user);
}

export function printFeed(feed: Feed, user: User): void {
  console.log(`* ID:            ${feed.id}`);
  console.log(`* Created:       ${feed.createdAt}`);
  console.log(`* Updated:       ${feed.updatedAt}`);
  console.log(`* name:          ${feed.name}`);
  console.log(`* URL:           ${feed.url}`);
  console.log(`* User:          ${user.name}`);
}