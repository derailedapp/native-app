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

import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import sanitize from "sanitize-html";
import moment from "moment-timezone";
import { Thread } from "@/lib/api";
import TrackMeta from "./TrackMeta";
import Octicons from "@expo/vector-icons/Octicons";
import { Image } from "expo-image";

export default function ThreadComp({ item }: { item: Thread }) {
  let actor = item.profile?.actor;
  const day = item.track.indexed_ts + 86400;

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

  const router = useRouter();

  return (
    <View
      id={item.track.id}
      className="flex flex-col justify-start items-start w-full border border-brand dark:border-none transition ease-in-out duration-500 p-5 rounded-b-none bg-white dark:bg-secondary lg:rounded-3xl"
    >
      <View className="flex flex-row w-full gap-2">
        <Pressable onPress={() => router.push(`/!${actor?.id}`)}>
          <Image
            className="h-10 w-10 rounded-full"
            source={`${process.env.EXPO_PUBLIC_API_URL}/users/${item.profile!.actor.id}/avatar`}
          />
        </Pressable>
        <View className="w-full">
          <View className="flex flex-row lg:justify-between gap-1 w-full pb-2">
            <View className="flex flex-col gap-0.5">
              <Link href={`/!${actor?.id}`}>
                <Text className="text-black dark:text-white/70 font-main font-bold hover:underline">
                  {sanitize(actor?.display_name || actor?.id || "null")}
                </Text>
              </Link>
              <Link href={`/!${actor?.id}`}>
                <Text className="text-black dark:text-white/70 font-medium font-main">
                  {(actor?.handle && `@${actor.handle}`) || `!${actor?.id}`}
                </Text>
              </Link>
            </View>
          </View>
          <View>
            <Text className="text-black dark:text-white font-main font-medium max-w-md md:max-w-xl lg:max-w-2xl text-wrap pb-4">
              {sanitize(item.track.content)}
            </Text>
          </View>
          <View className="flex flex-row items-center gap-1 w-fit pb-1">
            <Octicons name="clock" size={13} className="text-graaaay" />
            <Text className="text-graaaay lg:text-sm font-normal">{date}</Text>
          </View>
          <TrackMeta item={item} />
        </View>
      </View>
    </View>
  );
}
