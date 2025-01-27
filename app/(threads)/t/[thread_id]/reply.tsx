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

import ThreadComp from "@/components/ThreadDisplay";
import { createReply } from "@/lib/api";
import { useCurrentTrackStore } from "@/lib/state";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ReplyModal() {
  const [postContent, setPostContent] = useState("");

  const localParams = useLocalSearchParams();
  const thread_id = localParams.thread_id as string;
  const router = useRouter();

  const currentTrack = useCurrentTrackStore((state) => state.currentTrack);

  const reply = () => {
    createReply(postContent, thread_id)
      .then(() => {
        router.push(`/t/${thread_id}`);
        router.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <View className="flex-1 justify-center items-center bg-transparent backdrop-blur-sm backdrop-opacity-95 backdrop-brightness-50">
      <View className="bg-white dark:bg-secondary p-4 gap-10 rounded-md w-full lg:w-fit h-fit">
        <View className="flex flex-row items-center justify-between">
          <Link href="../">
            <Text className="text-brand font-main">Cancel</Text>
          </Link>
          <Pressable onPress={reply}>
            <View className="rounded-full bg-brand px-5 py-1">
              <Text className="text-white font-main">Reply</Text>
            </View>
          </Pressable>
        </View>
        <View className="flex flex-col min-w-96 gap-10">
          <View className="border border-brand">
            {currentTrack && <ThreadComp item={currentTrack} />}
          </View>
          <TextInput
            multiline
            onChangeText={(text) => setPostContent(text)}
            value={postContent}
            placeholder="So, have I some news for you..."
            className="placeholder:text-graaaay text-black dark:text-white font-main h-40 min-w-96 text-xl"
          />
        </View>
      </View>
    </View>
  );
}
