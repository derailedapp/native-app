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

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getCurrentProfile,
  getProfile,
  getUserTracks,
  Profile,
} from "@/lib/api";
import PostList from "@/components/PostList";
import { View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import NotFoundScreen from "./+not-found";
import ProfileDisplay from "@/components/ProfileDisplay";
import { tokenStorage, useCurrentProfileStore } from "@/lib/state";
import { useQuery } from "@tanstack/react-query";

// TODO: support handles
export default function UserProfile() {
  const localParams = useLocalSearchParams();
  const user = localParams.user as string;
  const router = useRouter();

  const [thisProfile, setThisProfile] = useState<Profile | null>(null);

  const setCurrentProfile = useCurrentProfileStore((state) => state.setProfile);

  const query = useQuery({
    queryKey: ["userTracks", user],
    queryFn: async () => {
      return await getUserTracks(thisProfile!.actor.id);
    },
  });

  var isMe: boolean = false;

  if (user.startsWith("@")) {
    if (user == "@me") {
      isMe = true;
    } else {
      return <NotFoundScreen />;
    }
  } else if (user.startsWith("!")) {
    isMe = false;
  } else {
    return <NotFoundScreen />;
  }

  const [found, setFound] = useState(true);

  useEffect(() => {
    if (tokenStorage.contains("token")) {
      getCurrentProfile()
        .then((profile) => {
          setCurrentProfile(profile);
          if (isMe) {
            setThisProfile(profile);
          }
        })
        .catch(() => {
          tokenStorage.delete("token");
          if (isMe) {
            router.push("..");
          }
        });
    }
    if (!isMe) {
      getProfile(user.replace("!", ""))
        .then((profile) => {
          setThisProfile(profile);
        })
        .catch((reason) => {
          setFound(false);
          console.error(reason);
        });
    }
  }, []);

  if (found) {
    return (
      <View className="flex flex-row justify-center min-w-full h-screen m-auto bg-not-quite-dark-blue overflow-y-auto scroll-smooth">
        <Sidebar />
        <View className="pt-9">
          <ProfileDisplay profile={thisProfile} />
          <PostList
            threads={
              query.data?.sort(
                (a, b) => a.track.indexed_ts - b.track.indexed_ts,
              ) || []
            }
          />
        </View>
      </View>
    );
  } else {
    return <NotFoundScreen />;
  }
}
