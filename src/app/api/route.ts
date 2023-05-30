import { NextResponse } from "next/server";
import { TwitterApi, TweetV2 } from "twitter-api-v2";
import tweetsSort from "../utils/tweetsSort";
import tweetsToHTML from "../utils/tweets2HTML";

const client = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY as string,
  appSecret: process.env.TWITTER_APP_SECRET as string,
  accessToken: process.env.TWITTER_ACCESS_TOKEN as string,
  accessSecret: process.env.TWITTER_ACCESS_SECRET as string,
});

export async function GET(req: Request) {
  // get query params
  const { searchParams } = new URL(req.url);
  const admin = searchParams.get("admin");
  const apiKey = searchParams.get("apiKey");
  const term = searchParams.get("term") || `("hello" OR "goodbye") "AND" ("love" OR "hate") -is:retweet`;

  // check for valid keys: http://localhost:3000/api?admin=cat&apiKey=dog&term=(%22hello%22%20OR%20%22goodbye%22)%20%22AND%22%20(%22love%22%20OR%20%22hate%22)
  if (admin !== process.env.ADMIN) return NextResponse.json({ error: "Invalid Admin Key" }, { status: 401 });
  if (!apiKey) return NextResponse.json({ error: "Invalid API Key" }, { status: 401 });
  if (!term) return NextResponse.json({ error: "Invalid Search Term" }, { status: 400 });

  try {
    // https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-all
    // https://github.com/PLhery/node-twitter-api-v2/blob/master/doc/v2.md#search-tweets-recent
    const tweets: TweetV2[] = await client.v2
      .search(term  + " -is:retweet", {
        start_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        max_results: 50,
        "tweet.fields": ["public_metrics"],
      })
      .then((res) => res.data.data)
      .then((tweets) => tweetsSort(tweets));

    // convert tweets to HTML
    const html = tweetsToHTML(tweets);
    return NextResponse.json({ html });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
