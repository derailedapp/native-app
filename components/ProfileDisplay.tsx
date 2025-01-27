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

import { Profile } from "@/lib/api";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import sanitize from "sanitize-html";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ProfileDisplay({
  profile,
  currentUser,
}: {
  profile: Profile | undefined;
  currentUser: boolean;
}) {
  return profile ? (
    <View className="flex dark:border-none lg:border-2 border-b-0 border-brand dark:border-graaaay gap-4 bg-white pb-5 dark:bg-secondary w-full lg:rounded-3xl">
      <View>
        <View className="flex items-start gap-3 w-full">
          <View className="bg-graaaay/50 dark:bg-transparent/70 w-full lg:rounded-3xl z-10">
            <Image
              className="w-full h-40 max-lg:rounded-t-none rounded-3xl z-0"
              source={[
                `${process.env.EXPO_PUBLIC_API_URL}/users/${profile.actor.id}/banner`,
              ]}
            />
            <div className="fixed top-0 mt-4 ml-4 lg:mt-12 lg:scale-90">
              <Link href="..">
                <Ionicons
                  name="arrow-back-circle-outline"
                  size={34}
                  className="text-brand"
                />
              </Link>
            </div>
          </View>
          <View className="flex flex-row absolute bottom-14 z-20 items-end">
            <Image
              className="h-20 w-20 ml-5 rounded-xl"
              source={`${process.env.EXPO_PUBLIC_API_URL}/users/${profile.actor.id}/avatar`}
            />
            <Text className="bg-brand text-white font-main ml-2 py-1.5 px-4 rounded-full transition duration-75 hover:scale-110">
              {sanitize(profile?.actor.status || "🚂")}
            </Text>
          </View>
          <View className="flex flex-row items-center justify-between w-full">
            <View className="pt-5 ml-5">
              <Text className="text-black dark:text-white font-main font-semibold text-lg">
                {sanitize(
                  profile?.actor.display_name ||
                    profile?.actor.handle ||
                    profile?.actor.id,
                )}
              </Text>
              <Text className="font-main text-dark-graaaay dark:text-graaaay font-medium">
                {profile?.actor.handle
                  ? `@${profile?.actor.handle}`
                  : `!${profile?.actor.id}`}
              </Text>
            </View>
            {currentUser && (
              <Link href="/edit-self">
                <View className="bg-brand p-2 px-4 rounded-full mr-5">
                  <Text className="text-white font-medium font-main">
                    Edit profile
                  </Text>
                </View>
              </Link>
            )}
          </View>
        </View>
      </View>
      <View className="flex justify-center w-full ml-5">
        <Text className="text-black dark:text-white">
          {sanitize(profile?.actor.bio || "This user has no bio.")}
        </Text>
      </View>
      <View className="flex flex-row items-start w-full gap-5 ml-5">
        <Text className="font-main text-dark-graaaay dark:text-graaaay">
          {profile?.followed || 0} Followed
        </Text>
        <Text className="font-main text-dark-graaaay dark:text-graaaay">
          {profile?.following || 0} Following
        </Text>
        <Text className="font-main text-dark-graaaay dark:text-graaaay">
          {profile?.tracks || 0} Posts
        </Text>
      </View>
    </View>
  ) : (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}
