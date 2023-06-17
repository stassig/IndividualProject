import { Tweet } from "../types/tweet";
import { TweetData } from "../types/tweet_data";

const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const GATEWAY_URL =
  process.env.NEXT_PUBLIC_GATEWAY_URL || "http://localhost:8080";

export const fetchTweets = async (): Promise<TweetData[]> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();
  const response = await fetch(`${GATEWAY_URL}/tweet`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
  });

  const tweets = await response.json();
  return tweets.collection;
};

export const createTweet = async (
  tweet: Tweet,
  followers: Array<any>
): Promise<TweetData> => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const requestBody = {
    tweet: tweet,
    followers: followers,
  };

  const response = await fetch(`${GATEWAY_URL}/tweet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
    body: JSON.stringify(requestBody),
  });
  const newTweet = await response.json();
  return newTweet;
};

export const updateFollowing = async (userId: string, followUserId: string) => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const requestBody = {
    user_id: userId,
    follow_user_id: followUserId,
  };

  await fetch(`${GATEWAY_URL}/tweet/follow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
    body: JSON.stringify(requestBody),
  });
};

export const updateUnfollowing = async (
  userId: string,
  unfollowUserId: string
) => {
  const tokenResponse = await fetch(`${URL}/api/auth/token`);
  const tokenData = await tokenResponse.json();

  const requestBody = {
    user_id: userId,
    unfollow_user_id: unfollowUserId,
  };

  await fetch(`${GATEWAY_URL}/tweet/unfollow`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenData,
    },
    body: JSON.stringify(requestBody),
  });
};
