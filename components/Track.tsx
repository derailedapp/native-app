/*
   Copyright 2024-2025 V.J. De Chico

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

import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import sanitize from "sanitize-html";
import moment from "moment";
import { Thread } from "@/lib/api";
import TrackMeta from "./TrackMeta";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";

export default function TrackComp({ item }: { item: Thread }) {
  let actor = item.profile?.actor;
  const day = item.track.indexed_ts + 86400;
  const router = useRouter();

  var date: string;
  const d = new Date();
  d.setTime(item.track.indexed_ts);
  if (Date.now() > day) {
    date = moment
      .tz(d, Intl.DateTimeFormat().resolvedOptions().timeZone)
      .fromNow();
  } else {
    date = moment
      .tz(d, Intl.DateTimeFormat().resolvedOptions().timeZone)
      .calendar();
  }

  return (
    <Pressable onPress={() => router.push(`/t/${item.track.id}`)}>
      <View className="flex flex-row gap-3 p-5 lg:p-6 bg-white dark:bg-secondary lg:mb-2 transition ease-in-out duration-500 border lg:rounded-3xl border-brand dark:border-bobo">
        <Pressable onPress={() => router.push(`/!${actor?.id}`)}>
          <Image
            className="h-10 w-10 rounded-full"
            source={`${process.env.EXPO_PUBLIC_API_URL}/users/${item.profile!.actor.id}/avatar`}
          />
        </Pressable>
        <View
          id={item.track.id}
          className="flex flex-col justify-start items-start w-full"
        >
          <View className="flex flex-row lg:justify-between gap-1 w-full pb-2">
            <View className="flex flex-col gap-0.5">
              <Pressable onPress={() => router.push(`/!${actor?.id}`)}>
                <Text className="text-black dark:text-white/70 font-main font-semibold hover:underline text-ellipsis">
                  {sanitize(actor?.display_name || actor?.id || "null")}
                </Text>
              </Pressable>
              <Pressable onPress={() => router.push(`/!${actor?.id}`)}>
                <Text className="text-black dark:text-white/70 font-main text-ellipsis">
                  {(actor?.handle && `@${actor.handle}`) || `!${actor?.id}`}
                </Text>
              </Pressable>
            </View>
          </View>
          <View>
            <Text className="text-black dark:text-white font-main font-medium max-w-sm md:max-w-xl lg:max-w-2xl text-wrap pb-4">
              {sanitize(item.track.content)}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1 w-fit pb-4">
            <Ionicons name="time-sharp" size={18} className="text-graaaay" />
            <Text className="text-graaaay text-sm font-main">{date}</Text>
          </View>
          <TrackMeta item={item} />
        </View>
      </View>
    </Pressable>
  );
}
