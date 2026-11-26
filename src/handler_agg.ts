import {fetchFeed} from"./rss";

export async function handlerAgg(cmdName: string): Promise<void> {
  const feedURL = "https://www.wagslane.dev/index.xml";
  const feed = await fetchFeed(feedURL);
  console.log(JSON.stringify(feed, null, 2));
}