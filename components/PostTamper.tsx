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
import { Thread } from "@/lib/api";
import * as Clipboard from "expo-clipboard";

export default function PostTamper({ item, setTamper }: { item: Thread, setTamper: (value: boolean) => void }) {
    return (
        <View className="flex absolute z-[70] bg-tertiary right-0 lg:bottom-[4rem] lg:right-[5.4rem] rounded-xl p-2 gap-2 w-32">
            <View className="flex flex-row justify-between items-center gap-2 w-full hover:bg-secondary py-2 px-3 rounded-xl">
                <Octicons name="copy" color="white" />
                <Pressable onPress={async () => {await Clipboard.setStringAsync(item.track.content);setTamper(false)}}>
                    <Text className="text-white">
                        Copy Text
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}