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
      <View className="bg-not-quite-dark-blue p-4 gap-10 rounded-md min-w-96">
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
        <View className="flex flex-col items-center min-w-80 gap-10">
          {currentTrack && (
            <ThreadComp item={currentTrack} profiles={profiles} />
          )}
          <TextInput
            multiline
            onChangeText={(text) => setPostContent(text)}
            value={postContent}
            placeholder="So, have I some news for you..."
            className="placeholder:text-gray-400 text-white font-main h-40 min-w-80 text-xl"
          />
        </View>
      </View>
    </View>
  );
}
