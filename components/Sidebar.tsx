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
import { View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { tokenStorage } from "@/lib/state";
import LogoHead from "./LogoHead";

export default function Sidebar() {
  return (
    <View className="bg-primary max-lg:scale-110 lg:bg-none flex flex-row py-1.5 lg:pb-0 lg:flex-col items-center lg:top-0 bottom-0 lg:justify-center justify-evenly z-50 fixed lg:left-0 w-full lg:w-[69px] gap-4 lg:ml-4 overflow-y-auto">
      <LogoHead />
      <Link href="/">
        <View className="flex flex-row justify-center p-4 gap-3 hover:bg-secondary ease-in-out transition duration-500 rounded-xl">
          <Octicons name="home" size={25} color="white" />
        </View>
      </Link>
      <Link href={tokenStorage.contains("token") ? "/@me" : "/login"}>
        <View className="flex flex-row justify-center p-4 gap-3 hover:bg-secondary ease-in-out transition duration-500 rounded-xl">
          <Octicons name={tokenStorage.contains("token") ? "feed-person" : "sign-in"} size={25} color="white" />
        </View>
      </Link>
      {tokenStorage.contains("token") && (
        <Link href="/settings">
          <View className="flex flex-row justify-center p-4 gap-3 hover:bg-secondary ease-in-out transition duration-500 rounded-xl">
            <Octicons name="gear" size={25} color="white" />
          </View>
        </Link>
      )}
    </View>
  );
}
