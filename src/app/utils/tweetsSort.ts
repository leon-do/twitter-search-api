import { TweetV2 } from "twitter-api-v2";

export default function tweetsSort(tweets: TweetV2[]): TweetV2[] {
  // sort by retweet_count, like_count, impression_count
  return tweets
    .sort((a: any, b: any) => {
      if (a.public_metrics.retweet_count > b.public_metrics.retweet_count) return -1;
      if (a.public_metrics.retweet_count < b.public_metrics.retweet_count) return 1;
      return 0;
    })
    .sort((a: any, b: any) => {
      if (a.public_metrics.like_count > b.public_metrics.like_count) return -1;
      if (a.public_metrics.like_count < b.public_metrics.like_count) return 1;
      return 0;
    })
    .sort((a: any, b: any) => {
      if (a.public_metrics.impression_count > b.public_metrics.impression_count) return -1;
      if (a.public_metrics.impression_count < b.public_metrics.impression_count) return 1;
      return 0;
    });
}
