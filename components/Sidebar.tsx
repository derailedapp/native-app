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

// S: threads

import { Link } from "expo-router";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { tokenStorage } from "@/lib/state";
import LogoHead from "./LogoHead";

export default function Sidebar({ curPage }: { curPage: string | undefined }) {
  return (
    <View className="bg-white dark:bg-primary lg:bg-none lg:min-h-screen flex lg:items-start flex-row pb-2.5 max-lg:pt-1.5 lg:pb-0 lg:flex-col max-lg:items-center lg:top-5 max-lg:bottom-0 lg:justify-start justify-evenly fixed lg:left-6 w-full lg:w-32 gap-4 overflow-y-auto z-50">
      <LogoHead />
      <Link href="/">
        <View className="flex lg:flex-row items-center justify-center w-full rounded-full py-1 lg:gap-3">
          <Ionicons
            name="home-sharp"
            size={25}
            className={`${(curPage === "home" && "text-brand dark:text-brand") || "text-graaaay dark:text-white"}`}
          />
          <Text
            className={`font-main ${(curPage === "home" && "text-brand dark:text-brand") || "text-graaaay dark:text-white"} text-sm font-bold`}
          >
            Explore
          </Text>
        </View>
      </Link>
      <Link href={tokenStorage.contains("token") ? "/@me" : "/login"}>
        <View className="flex lg:flex-row items-center w-full rounded-full py-1 lg:gap-3">
          <Ionicons
            name={
              tokenStorage.contains("token")
                ? "person-circle-sharp"
                : "log-in-sharp"
            }
            size={25}
            className={`${(curPage === "@me" && "text-brand dark:text-brand") || "text-graaaay dark:text-white"}`}
          />
          <Text
            className={`font-main ${(curPage === "@me" && "text-brand dark:text-brand") || "text-graaaay dark:text-white"} text-sm font-bold`}
          >
            {(tokenStorage.contains("token") && "Profile") || "Login"}
          </Text>
        </View>
      </Link>
      {tokenStorage.contains("token") && (
        <Link href="/settings">
          <View className="flex lg:flex-row items-center min-w-full py-1 lg:gap-3 rounded-full">
            <Ionicons
              name="cog-sharp"
              size={25}
              className={`${(curPage === "settings" && "text-brand dark:text-brand") || "text-graaaay dark:text-white"}`}
            />
            <Text
              className={`font-main ${(curPage === "settings" && "text-brand dark:text-brand") || "text-graaaay dark:text-white"} text-sm font-bold`}
            >
              Settings
            </Text>
          </View>
        </Link>
      )}
    </View>
  );
}
