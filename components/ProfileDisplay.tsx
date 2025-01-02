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

import { Profile } from "@/lib/api";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import sanitize from "sanitize-html";

export default function ProfileDisplay({
  profile,
  currentUser,
}: {
  profile: Profile | undefined;
  currentUser: boolean;
}) {
  return profile ? (
    <View className="flex gap-4 p-5 bg-not-quite-dark-blue w-full border border-borders rounded-md">
      <View className="flex flex-row items-center justify-between w-full">
        <View>
          <Text className="text-white font-main font-semibold text-lg">
            {sanitize(
              profile?.actor.display_name ||
                profile?.actor.handle ||
                profile?.actor.id,
            )}
          </Text>
          <Text className="font-main text-gray-400">
            {profile?.actor.handle
              ? `@${profile?.actor.handle}`
              : `!${profile?.actor.id}`}
          </Text>
        </View>

        {currentUser && (
          <Link href="/edit-self">
            <View className="bg-brand p-2 px-4 rounded-md">
              <Text className="text-white">Edit</Text>
            </View>
          </Link>
        )}
      </View>
      <View className="flex flex-row items-start w-full gap-5">
        <Text className="text-white font-main">
          {profile?.followed || 0} <Text className="text-leet">Followed</Text>
        </Text>
        <Text className="text-white font-main">
          {profile?.following || 0} <Text className="text-leet">Following</Text>
        </Text>
        <Text className="text-white font-main">
          {profile?.tracks || 0} <Text className="text-leet">Posts</Text>
        </Text>
      </View>
      <View className="flex justify-center w-full">
        <Text className="text-white">
          {sanitize(profile?.actor.bio || "This user has no bio.")}
        </Text>
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
