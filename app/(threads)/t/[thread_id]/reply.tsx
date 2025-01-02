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

import ThreadComp from "@/components/ThreadDisplay";
import { createReply } from "@/lib/api";
import { useCurrentTrackStore, useProfileStore } from "@/lib/state";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function ReplyModal() {
  const [postContent, setPostContent] = useState("");

  const localParams = useLocalSearchParams();
  const thread_id = localParams.thread_id as string;
  const router = useRouter();

  const profiles = useProfileStore((state) => state.profiles);
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
      <View className="bg-not-quite-dark-blue p-4 gap-10 rounded-md w-4/12 h-3/6">
        <View className="flex flex-row justify-between">
          <Link href="../">
            <Text className="text-blue-400 font-main">Cancel</Text>
          </Link>
          <Pressable onPress={reply}>
            <View className="p-3 rounded-md">
              <Text className="text-brand font-main">Reply</Text>
            </View>
          </Pressable>
        </View>
        <View className="flex flex-col min-w-96 gap-10">
          {currentTrack && (
            <ThreadComp item={currentTrack} profiles={profiles} />
          )}
          <TextInput
            multiline
            onChangeText={(text) => setPostContent(text)}
            value={postContent}
            placeholder="So, have I some news for you..."
            className="placeholder:text-gray-400 text-white font-main h-40 min-w-96 text-xl"
          />
        </View>
      </View>
    </View>
  );
}
