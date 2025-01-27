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

import Sidebar from "@/components/Sidebar";
import { getThread } from "@/lib/api";
import PostList from "@/components/PostList";
import { Text, View } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import ThreadComp from "@/components/ThreadDisplay";
import { useCurrentTrackStore } from "@/lib/state";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";

export default function ThreadView() {
  const localParams = useLocalSearchParams();
  const thread_id = localParams.thread_id as string;

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

  return (
    <View
      className={
        "flex flex-row justify-center w-full h-full m-auto bg-white no-scrollbar dark:bg-primary gap-4 overflow-y-auto scroll-smooth"
      }
    >
      <Sidebar curPage={undefined} />
      <View className="lg:mt-9 max-lg:w-full h-fit">
        {currentTrack && <ThreadComp item={currentTrack} />}
        {}
        <Link href={`/t/${thread_id}/reply`}>
          <View className="w-full flex flex-row justify-start items-center gap-3 lg:mt-3 pl-5 p-3 lg:rounded-full bg-brand">
            <Image
              className="h-10 w-10 rounded-full"
              source={`${process.env.EXPO_PUBLIC_API_URL}/users/${currentTrack?.profile!.actor.id}/avatar`}
            />
            <Text className="text-white font-main font-semibold">
              Write your reply...
            </Text>
          </View>
        </Link>
        <PostList
          threads={
            query.data?.sort(
              (a, b) => a.track.indexed_ts - b.track.indexed_ts,
            ) || []
          }
          loading={query.isLoading}
        />
      </View>
    </View>
  );
}
