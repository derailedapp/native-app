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

import { Thread } from "@/lib/api";
import { FlashList } from "@shopify/flash-list";
import { ActivityIndicator, Text, View } from "react-native";
import TrackComp from "./Track";

export default function PostList({
  threads,
  loading,
}: {
  threads: Thread[];
  loading: boolean;
}) {
  // TODO: markdown formatting
  return (
    <View className="w-full lg:w-[602px] mb-20 lg:mb-5 lg:mt-5 z-[1] no-scrollbar">
      {threads.length > 0 && (
        <FlashList
          estimatedItemSize={150}
          data={threads}
          className="flex flex-row w-full h-full no-scrollbar lg:rounded-t-3xl rounded-b-3xl scrollbar-thin scrollbar-thumb-rounded-3xl scrollbar-corner-rounded-3xl scrollbar-track-rounded-3xl"
          renderItem={({ item }) => <TrackComp item={item} />}
        />
      )}
      {threads.length === 0 && loading === false && (
        <View className="flex justify-start items-start h-screen w-full p-4 rounded-xl rounded-t-none border-t border-borders">
          <Text className="text-graaaay dark:text-white/70 font-semibold">
            Oh no! It seems empty here... You can be the first to reply!
          </Text>
        </View>
      )}
      {threads.length === 0 && loading === true && (
        <View className="flex justify-center items-center h-screen w-full p-4 rounded-xl rounded-t-none border-t border-borders">
          <ActivityIndicator size="large" className="text-brand" />
        </View>
      )}
    </View>
  );
}
