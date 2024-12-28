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
import { getCurrentProfile, getProfile, Post, Profile, scrollGlobal } from "@/lib/api";
import PostList from "@/components/PostList";
import { View } from "react-native";
import { tokenStorage } from "@/lib/state";
import LogoHead from "@/components/LogoHead";

export default function GlobalFeed() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

    useEffect(() => {
        scrollGlobal().then((scrollPosts) => {
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
        <View className={"flex flex-row justify-center min-w-full m-auto bg-not-quite-dark-blue gap-4"}>
            <Sidebar />
            <View className="border-l border-r border-white">
                <LogoHead />
                <PostList posts={posts} profiles={profiles} />
            </View>
        </View>
    )
}