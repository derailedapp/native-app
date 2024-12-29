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

import { Post, Profile } from "@/lib/api";
import { FlashList } from "@shopify/flash-list";
import { View } from "react-native";
import PostComp from "./Post";

export default function PostList({
  posts,
  profiles,
}: {
  posts: Post[];
  profiles: Profile[];
}) {
  // TODO: markdown formatting
  return (
    <View className="lg:min-w-[48rem] max-w-[48rem] min-h-screen min-w-full pt-5">
      <FlashList
        estimatedItemSize={150}
        data={posts.sort((a, b) => b.indexed_ts - a.indexed_ts)}
        className="flex flex-row"
        renderItem={({ item }) => <PostComp item={item} profiles={profiles} />}
      />
    </View>
  );
}
