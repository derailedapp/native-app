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
        <View className="flex fixed mb-[5.5rem] lg:mb-9 items-center justify-center bottom-0 h-14 w-14 lg:mr-[692px] max-lg:ml-4 max-lg:left-0 z-20">
            <Pressable onPress={() => router.push("/compose")} className="h-full w-full">
                <View className="flex items-center justify-center bg-brand rounded-full h-full w-full">
                        <Octicons name="pencil" size={25} color="white" />
                </View>
            </Pressable>
        </View>
    )
}