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

import { createTrack } from "@/lib/api";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function PostModal() {
  const [postContent, setPostContent] = useState("");

  const router = useRouter();

  const post = () => {
    createTrack(postContent)
      .then(() => {
        router.push("/");
        router.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <View className="flex-1 justify-center items-center bg-transparent backdrop-blur-sm backdrop-opacity-95 backdrop-brightness-50 scroll-smooth">
      <View className="bg-white dark:bg-secondary p-4 gap-10 h-full rounded-md max-lg:w-full lg:min-w-96 xl:min-w-[34rem] xl:h-96">
        <View className="flex flex-row items-center justify-between">
          <Link href="../">
            <Text className="text-brand font-main font-medium">Cancel</Text>
          </Link>
          <Pressable onPress={post}>
            <Text className="text-white bg-brand px-5 py-1 rounded-full font-main font-medium">
              Post
            </Text>
          </Pressable>
        </View>
        <View className="flex flex-row items-center w-full h-full lg:min-w-80">
          <TextInput
            multiline
            onChangeText={(text) => setPostContent(text)}
            value={postContent}
            placeholder="So, have I some news for you..."
            className="placeholder:text-gray-400 text-black dark:text-white font-main h-full w-full lg:min-w-80 text-xl"
          />
        </View>
      </View>
    </View>
  );
}
