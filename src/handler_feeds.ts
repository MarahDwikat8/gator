import { getFeeds } from "./lib/db/queries/feeds";

export async function handlerListFeeds(cmdName: string): Promise<void> {
  const allFeeds = await getFeeds();

  if (allFeeds.length === 0) {
    console.log("No feeds found.");
    return;
  }

  for (const feed of allFeeds) {
    console.log(`* ${feed.feedName}`);
    console.log(`  URL:   ${feed.url}`);
    console.log(`  Added by: ${feed.userName}`);
  }
}