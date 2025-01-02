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
import moment from "moment";
import { Profile, Thread } from "@/lib/api";

export default function TrackComp({
  item,
  profiles,
}: {
  item: Thread;
  profiles: Map<string, Profile>;
}) {
  let profile = profiles.get(item.profile?.actor.id || "");
  let actor = profile?.actor;
  const day = item.track.indexed_ts + 86400;
  const router = useRouter();

  var date: string;
  const d = new Date();
  d.setTime(item.track.indexed_ts);
  if (Date.now() > day) {
    date = moment.utc(d).fromNow();
  } else {
    date = moment.utc(d).calendar();
  }
  return (
    <Pressable
      onPress={() => router.push(`/t/${item.track.id}`)}
    >
      <View
        id={item.track.id}
        className="flex flex-col justify-start items-start w-full transition ease-in-out duration-500 bg-quite-lighter-dark-blue hover:bg-quite-lightier-lighter-dark-blue p-5 my-1.5 rounded-md border hover:border-leet border-borders"
      >
        <View className="flex flex-row gap-1 pb-4 w-full">
          <View className="flex flex-col items-center pb-4">
            <Link href={`/!${actor?.id}`}>
              <Text className="text-white font-main font-semibold hover:underline">
                {sanitize(actor?.display_name || actor?.id || "null")}
              </Text>
            </Link>
            <Link href={`/!${actor?.id}`}>
              <Text className="text-white/70 font-main">
                @{actor?.handle || actor?.id}
              </Text>
            </Link>
          </View>
          <Text className="text-white">•</Text>
          <Text className="text-white">{date}</Text>
        </View>
        <View>
          <Text className="text-white font-main font-medium max-w-sm md:max-w-xl lg:max-w-2xl text-wrap">
            {sanitize(item.track.content)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
