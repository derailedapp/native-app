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

import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getCurrentProfile, getProfile, Post, Profile, scrollExc } from "@/lib/api";
import PostList from "@/components/PostList";
import { View } from "react-native";
import { tokenStorage } from "@/lib/state";
import PostInput from "@/components/PostInput";

export default function GlobalFeed() {
    const [posts, setPosts] = useState<Post[]>([
        {
            id: "woo",
            type: 0,
            author_id: "noo",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            original_ts: 1735237874,
            indexed_ts: 1735237874,
            parent_id: null,
            signature: "papi"
        }
    ]);
    const [profiles, setProfiles] = useState<Profile[]>([{
        actor: {
            id: "noo",
            handle: null,
            display_name: "Display Name",
            bio: null,
            status: null,
            public_key: ""
        },
        followed: 0,
        following: 0,
        posts: 0
    }]);
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

    useEffect(() => {
        scrollExc(posts.map(p => p.id)).then((scrollPosts) => {
            scrollPosts = [...scrollPosts, ...posts];
            const scrollProfiles = [...profiles];

            scrollPosts.forEach(p => {
                if (!profiles.find((profile) => profile.actor.id === p.author_id) && p.author_id !== null) {
                    getProfile(p.author_id!).then((profile) => scrollProfiles.push(profile))
                }
            });
            setProfiles(scrollProfiles);
            setPosts(scrollPosts);
        });
        if (tokenStorage.contains("token")) {
            getCurrentProfile().then((profile) => {
                setCurrentProfile(profile);
            }).catch(() => tokenStorage.delete("token"));
        }
    }, []);

    return (
        <View className="flex flex-row items-center justify-center min-w-full m-auto bg-not-quite-dark-blue gap-4">
            <Sidebar />
            <View className="flex border-l border-r border-white">
                <PostInput />
                <PostList posts={posts} profiles={profiles} />
            </View>
        </View>
    )
}