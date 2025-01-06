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
import { View } from "react-native";
import { tokenStorage, useCurrentProfileStore } from "@/lib/state";
import { useQuery } from "@tanstack/react-query";
import LogoHead from "@/components/LogoHead";

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
        "flex flex-row relative justify-center min-w-full h-screen mx-auto overflow-y-auto bg-black scroll-smooth"
      }
    >
      <Sidebar />
      <View className="bg-primary gap-4 rounded-t-3xl mt-9 pt-4">
        <LogoHead />
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
