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
import Sidebar from "@/components/Sidebar";
import { getCurrentProfile, getThread, Profile, Thread } from "@/lib/api";
import PostList from "@/components/PostList";
import { Text, View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import ThreadComp from "@/components/ThreadDisplay";
import {
  tokenStorage,
  useCurrentProfileStore,
  useCurrentTrackStore,
} from "@/lib/state";
import { useQuery } from "@tanstack/react-query";

export default function ThreadView() {
  const localParams = useLocalSearchParams();
  const thread_id = localParams.thread_id as string;

  const setCurrentProfile = useCurrentProfileStore((state) => state.setProfile);
  const setCurrentTrack = useCurrentTrackStore((state) => state.setTrack);

  const currentTrack = useCurrentTrackStore((state) => state.currentTrack);

  const query = useQuery({
    queryKey: ["threadChildren", thread_id],
    queryFn: async () => {
      let thread = await getThread(thread_id);
      setCurrentTrack(thread);
      return thread.children!;
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
        "flex flex-row justify-center w-full h-screen m-auto bg-black gap-4 overflow-y-auto scroll-smooth"
      }
    >
      <Sidebar />
      <View className="pt-9">
        {currentTrack && <ThreadComp item={currentTrack} />}
        <Link href={`/t/${thread_id}/reply`}>
          <View className="w-full flex justify-start items-start border-t border-borders p-3 rounded-xl rounded-t-none rounded-b-none bg-primary">
            <Text className="text-white/70 font-main">Write your reply...</Text>
          </View>
        </Link>
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
}
