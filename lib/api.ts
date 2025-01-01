/*
   Copyright 2024 V.J. De Chico

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import { tokenStorage } from "./state";

export const createUser = async (
  email: string,
  username: string,
  password: string,
) => {
  const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/create", {
    method: "POST",
    body: JSON.stringify({
      email,
      username,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();
  return [data.token, data.user];
};

export const userLogin = async (email: string, password: string) => {
  const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();
  return [data.token, data.user];
};

export const scrollGlobal = async (
  beforeTs: number | undefined = undefined,
): Promise<Thread[]> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/posts/scroll");

  if (beforeTs !== undefined) {
    url.searchParams.set("before_ts", beforeTs.toString());
  }

  const resp = await fetch(url, {
    method: "GET",
  });

  return await resp.json();
};

export const getProfile = async (user_id: string): Promise<Profile> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/users/" + user_id);
  const resp = await fetch(url, {
    method: "GET",
  });

  return await resp.json();
};

export const getUserPosts = async (user_id: string): Promise<Thread[]> => {
  const url = new URL(
    process.env.EXPO_PUBLIC_API_URL + "/users/" + user_id + "/posts",
  );
  const resp = await fetch(url, {
    method: "GET",
  });

  return await resp.json();
};

export const getCurrentProfile = async (): Promise<Profile> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/users/@me");
  const resp = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: tokenStorage.getString("token")!,
    },
  });

  return await resp.json();
};

export const createPost = async (content: string): Promise<Post> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/posts");
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      content: content,
    }),
    headers: {
      Authorization: tokenStorage.getString("token")!,
      "Content-Type": "application/json",
    },
  });

  return await resp.json();
};

export const createReply = async (
  content: string,
  parent_id: string,
): Promise<Post> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/posts");
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({
      content: content,
      parent_id: parent_id,
    }),
    headers: {
      Authorization: tokenStorage.getString("token")!,
      "Content-Type": "application/json",
    },
  });

  return await resp.json();
};

export const getThread = async (post_id: string): Promise<Thread> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/posts/" + post_id);
  const resp = await fetch(url, {
    method: "GET",
    mode: "cors",
  });

  return await resp.json();
};

export interface Actor {
  id: string;
  handle: string | null;
  display_name: string | null;
  bio: string | null;
  status: string | null;
  public_key: string;
}

export interface Post {
  id: string;
  type: number;
  author_id: string | null;
  content: string;
  original_ts: number;
  indexed_ts: number;
  parent_id: string | null;
  signature: string;
}

export interface Profile {
  actor: Actor;
  followed: number;
  following: number;
  posts: number;
}

export interface Reaction {
  emoji: string;
  reactions: number;
}

export interface Thread {
  post: Post;
  profile: Profile | null;
  reactions: Reaction[];
  children: Thread[];
}
