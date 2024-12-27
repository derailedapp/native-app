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

import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

export default function PostInput() {
    const [content, setContent] = useState("");
    return (
        <View className="flex w-auto h-auto p-5 min-h-10 max-h-60 gap-6">
            <TextInput
            editable
            multiline
            maxLength={2048}
            onChangeText={text => setContent(text)}
            value={content}
            placeholder="Lorem Ipsum!?"
            className="text-white text-lg font-main h-auto min-h-32 max-h-60 overflow-hidden"
            />
            <Pressable>
                <View className="text-xl font-extrabold font-main bg-brand text-white text-center p-1 py-2 rounded-3xl w-20">
                    Post
                </View>
            </Pressable>
        </View>
    )
}
