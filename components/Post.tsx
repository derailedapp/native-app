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

import { Link } from "expo-router";
import { Text, View } from "react-native";
import sanitize from "sanitize-html";
import moment from "moment";
import { Post, Profile } from "@/lib/api";

export default function PostComp({ item, profiles }: { item: Post; profiles: Profile[] }) {
    let profile = profiles.find((profile) => profile.actor.id == item.author_id)!;
    let actor = profile.actor;
    const day = item.indexed_ts + 86400;

    var date: string;
    if (Date.now() > day) {
        date = moment.unix(item.indexed_ts).fromNow();
    } else {
        date = moment.unix(item.indexed_ts).calendar();
    }
    return (
        <View id={item.id} className="flex flex-col justify-start items-start w-full transition ease-in-out duration-500 hover:bg-quite-lighter-dark-blue p-5 border-b border-t border-white">
            <View className="flex flex-row place-items-start items-center gap-1 pb-4">
                <Link href={`/!${item.id}`}>
                    <Text className="text-white font-main font-semibold">
                        {sanitize(actor.display_name || actor.id)}
                    </Text>
                </Link>
                <Text className="text-white">
                •
                </Text>
                <Link href={`/!${item.id}`}>
                    <Text className="text-white/70 font-main">
                        @{actor.handle || actor.id}
                    </Text>
                </Link>
                <Text className="text-white">
                •
                </Text>
                <Text className="text-white">
                    {date}
                </Text>
            </View>
            <View>
                <Text className="text-white font-main font-medium max-w-sm md:max-w-xl lg:max-w-2xl text-wrap">{sanitize(item.content)}</Text>
            </View>
        </View>
    )
}