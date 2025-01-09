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

export const authHeaders = (otherHeaders: object = {}): HeadersInit => {
  if (tokenStorage.contains("token")) {
    return {
      ...otherHeaders,
      "Content-Type": "application/json",
      Authorization: tokenStorage.getString("token")!,
    }
  } else {
    return {
      ...otherHeaders,
      "Content-Type": "application/json",
    }
  }
}

export const createUser = async (email: string, password: string) => {
  const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/create", {
    method: "POST",
    mode: "cors",
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

export const userLogin = async (email: string, password: string) => {
  const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/login", {
    method: "POST",
    mode: "cors",
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

export const userEdit = async (
  email: string | undefined,
  new_password: string | undefined,
  old_password: string | undefined,
  display_name: string | null | undefined,
  bio: string | null | undefined,
  status: string | null | undefined,
): Promise<Profile> => {
  const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/@me", {
    method: "PATCH",
    mode: "cors",
    body: JSON.stringify({
      email,
      new_password,
      old_password,
      display_name,
      bio,
      status,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: tokenStorage.getString("token")!,
    },
  });

  const data = await resp.json();
  return data;
};

export const scrollGlobal = async (
  beforeTs: number | undefined = undefined,
): Promise<Thread[]> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks/scroll");

  if (beforeTs !== undefined) {
    url.searchParams.set("before_ts", beforeTs.toString());
  }

  const resp = await fetch(url, {
    method: "GET",
    headers: authHeaders()
  });

  return await resp.json();
};

export const getProfile = async (user_id: string): Promise<Profile> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/users/" + user_id);
  const resp = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: authHeaders(),
  });

  return await resp.json();
};

export const getUserTracks = async (user_id: string): Promise<Thread[]> => {
  const url = new URL(
    process.env.EXPO_PUBLIC_API_URL + "/users/" + user_id + "/tracks",
  );
  const resp = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: authHeaders(),
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

export const createTrack = async (content: string): Promise<Track> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks");
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
): Promise<Track> => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks");
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
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks/" + post_id);
  const resp = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: authHeaders(),
  });

  return await resp.json();
};

export const bookmark = async (post_id: string) => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks/" + post_id + "/bookmark");
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: authHeaders(),
  });
};

export const unbookmark = async (post_id: string) => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks/" + post_id + "/bookmark");
  const resp = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: authHeaders(),
  });
};

export const react = async (post_id: string) => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks/" + post_id + "/react");
  const resp = await fetch(url, {
    method: "POST",
    mode: "cors",
    headers: authHeaders(),
  });
};

export const unreact = async (post_id: string) => {
  const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/tracks/" + post_id + "/react");
  const resp = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: authHeaders(),
  });
};

export interface Actor {
  id: string;
  handle: string | null;
  display_name: string | null;
  bio: string | null;
  status: string | null;
  public_key: string;
}

export interface Track {
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
  tracks: number;
}

export interface Reaction {
  emoji: string;
  reactions: number;
}

export interface Thread {
  track: Track;
  profile: Profile | null;
  reactions: Reaction[];
  children: Thread[] | undefined;
  likes: number;
  comments: number;
  bookmarks: number;
  bookmarked: boolean | undefined;
  liked: boolean | undefined;
}
