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
import { tokenStorage } from "@/lib/state";
import { useQuery } from "@tanstack/react-query";

// TODO: support handles
export default function UserProfile() {
  const localParams = useLocalSearchParams();
  const user = localParams.user as string;

  const [found, setFound] = useState(true);

  const profileQuery = useQuery({
    queryKey: ["profile", user],
    queryFn: async () => {
      try {
        return await getProfile(user.replace("!", ""));
      } catch {
        setFound(false);
      }
    },
  });
  const query = useQuery({
    queryKey: ["userTracks", user],
    queryFn: async () => {
      return await getUserTracks(user.replace("!", ""));
    },
  });
  const currentUserQuery = useQuery({
    queryKey: ["currentProfile"],
    queryFn: async () => {
      if (tokenStorage.contains("token")) {
        return await getCurrentProfile();
      }
    },
  });

  if (found) {
    return (
      <View className="flex flex-row justify-center w-full h-screen m-auto bg-primary overflow-y-auto overflow-x-hidden scroll-smooth">
        <Sidebar />
        <View className="lg:mt-9 rounded-3xl max-lg:w-full">
          <ProfileDisplay
            profile={profileQuery.data}
            currentUser={
              profileQuery.data?.actor.id === currentUserQuery.data?.actor.id
            }
          />
          <PostList
            threads={
              query.data?.sort(
                (a, b) => b.track.indexed_ts - a.track.indexed_ts,
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
