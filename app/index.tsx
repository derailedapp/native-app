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

import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getCurrentProfile, Profile, scrollGlobal, Thread } from "@/lib/api";
import PostList from "@/components/PostList";
import { Text, View } from "react-native";
import { tokenStorage, useCurrentProfileStore } from "@/lib/state";
import { useQuery } from "@tanstack/react-query";

export default function GlobalFeed() {
  const setCurrentProfile = useCurrentProfileStore((state) => state.setProfile);
  const query = useQuery({
    queryKey: ["globalTracks"],
    queryFn: async () => {
      return await scrollGlobal();
    },
  });

  useEffect(() => {
    if (tokenStorage.contains("token")) {
      getCurrentProfile()
        .then((profile) => {
          setCurrentProfile(profile);
        })
        .catch(() => tokenStorage.delete("token"));
    }
  }, []);

  return (
    <View
      className={
        "flex flex-row relative justify-center w-full h-screen mx-auto overflow-y-auto bg-black scroll-smooth"
      }
    >
      <Sidebar />
      <View className="fixed flex justify-center items-center bg-primary/50 backdrop-blur-xl underline decoration-brand backdrop-brightness-50 z-10 p-5 w-full lg:w-[602px]">
        <Text className="text-xl text-white font-main font-semibold">
          Global
        </Text>
      </View>
      <View className="bg-primary max-lg:w-full h-screen gap-4 mt-[3.8rem]">
        <View className="overflow-y-auto">
          <PostList
            threads={
              query.data?.sort(
                (a, b) => b.track.indexed_ts - a.track.indexed_ts,
              ) || []
            }
          />
        </View>
      </View>
    </View>
  );
}
