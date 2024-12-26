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
import { Link, useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import sanitize from "sanitize-html";

export default function PostList({ posts, profiles }: { posts: Post[], profiles: Profile[] }) {
    const router = useRouter();

    // TODO: markdown formatting
    return (
        <FlashList
            data={posts}
            renderItem={({ item }) => {
                let profile = profiles.find((profile) => profile.actor.id == item.author_id)!;
                let actor = profile.actor;
                return (
                    <View id={item.id}>
                        <View>
                            <Link href={"/@" + item.id}>
                                <Text>
                                    {sanitize(actor.display_name || actor.id)}
                                </Text>
                                <Text>
                                    @{actor.handle || actor.id}
                                </Text>
                            </Link>
                        </View>
                        <View>
                            <Text>{sanitize(item.content)}</Text>
                        </View>
                    </View>
                )
            }}
        />
    )
}