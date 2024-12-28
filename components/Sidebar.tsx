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

// S: threads

import { Link } from "expo-router";
import { Text, View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { tokenStorage } from "@/lib/state";

export default function Sidebar() {
  return (
    <View className="hidden lg:flex flex-col justify-start gap-4 p-3 pr-10 pt-9">
      <Link href="/global">
        <View className="flex flex-row items-center p-4 gap-3 hover:bg-quite-lighter-dark-blue ease-in-out transition duration-500 min-w-32 rounded-xl">
          <Octicons name="home" size={24} color="white" />
          <Text className="text-white font-main text-xl">Home</Text>
        </View>
      </Link>
      <Link href="/users/@me">
        <View className="flex flex-row items-center p-4 gap-3 hover:bg-quite-lighter-dark-blue ease-in-out transition duration-500 min-w-32 rounded-xl">
          <Octicons name="feed-person" size={24} color="white" />
          <Text className="text-white font-main text-xl">Profile</Text>
        </View>
      </Link>
      {tokenStorage.contains("token") && (
        <Link href="/post">
          <View className="flex flex-row items-center justify-center p-4 gap-3 bg-brand hover:bg-brand/85 ease-in-out transition duration-500 rounded-xl min-w-32 mt-8">
            <Octicons name="pencil" size={20} color="white" />
            <Text className="font-main text-white text-xl">Post</Text>
          </View>
        </Link>
      )}
      {!tokenStorage.contains("token") && (
        <Link href="/login">
          <View className="flex flex-row items-center justify-center p-4 gap-3 bg-brand hover:bg-brand/85 ease-in-out transition duration-500 rounded-xl min-w-32 mt-8">
            <Octicons name="sign-in" size={20} color="white" />
            <Text className="font-main text-white text-xl">Login</Text>
          </View>
        </Link>
      )}
    </View>
  );
}
