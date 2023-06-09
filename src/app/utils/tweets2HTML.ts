import {TweetV2 } from "twitter-api-v2";
// @ts-nocheck
export default function tweets2HTML(tweets: TweetV2[]): string {
  let table = "";
  let i = 0;
  for (const tweet of tweets) {
    table += `
        <tr>
            <td>${i++}</td>
            <td><a href='https://twitter.com/a/status/${tweet.id}' target='_blank'>${tweet.text}</a></td>
            <td>${(tweet.public_metrics as any).impression_count || 0 }</td>
            <td>${tweet.public_metrics?.like_count || 0}</td>
            <td>${tweet.public_metrics?.retweet_count || 0}</td>
        </tr>`;
  }
  // create html
  let html = `
    <!DOCTYPE html> 
    <html> 
        <head> 
        <style>
            table {
                font-family: arial, sans-serif;
                border-collapse: collapse;
                width: 100%;
            }

            td, th {
                border: 1px solid #dddddd;
                text-align: left;
                padding: 8px;
            }

            tr:nth-child(even) {
                background-color: #dddddd;
            }
        </style>
        <body>
        <h1>Twitter Search Results</h1>
            <table>
            <tr>
                <th>Rank</th>
                <th>Text</th>
                <th>Views</th>
                <th>Likes</th>
                <th>Retweets</th>
            </tr>
            ${table}
        </table>
        </body>
    </html>
    `;

  return html.replace(/(\r\n|\n|\r)/gm, "");
}
