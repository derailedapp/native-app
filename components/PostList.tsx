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
import { Text, View } from "react-native";
import TrackComp from "./Track";

export default function PostList({ threads }: { threads: Thread[] }) {
  // TODO: markdown formatting
  return (
    <View className="w-full lg:w-[602px]">
      {threads.length > 0 && (
        <FlashList
          estimatedItemSize={150}
          data={threads}
          className="flex flex-row h-screen rounded-b-3xl"
          renderItem={({ item }) => <TrackComp item={item} />}
        />
      )}
      {threads.length == 0 && (
        <View className="flex justify-start items-start h-full w-full p-4 rounded-xl rounded-t-none border-t border-borders">
          <Text className="text-white/70">
            Oh no! It seems empty here... You can be the first to reply!
          </Text>
        </View>
      )}
    </View>
  );
}
