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

import { Pressable, Text, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";

export default function PostCreate() {
  let router = useRouter();
  return (
    <View className="flex fixed items-center justify-center max-lg:mb-28 bottom-0 h-8 w-fit max-lg:ml-4 max-lg:left-0 z-30 lg:top-5 lg:right-6">
      <Pressable
        onPress={() => router.push("/compose")}
        className="h-full w-full"
      >
        <View className="flex flex-row items-center gap-2 justify-center rounded-full bg-brand h-full w-full max-lg:p-6 lg:px-4">
          <Octicons name="pencil" size={20} className="text-white" />
          <Text className="max-lg:hidden text-white font-main font-bold">
            Post
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
