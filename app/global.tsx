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
import { getCurrentProfile, Profile, scrollGlobal, Thread } from "@/lib/api";
import PostList from "@/components/PostList";
import { Text, View } from "react-native";
import { tokenStorage } from "@/lib/state";

export default function GlobalFeed() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);

  useEffect(() => {
    scrollGlobal().then((scrollPosts) => {
      const scrollProfiles = [...profiles];

      scrollPosts.forEach((p) => {
        const prof = scrollProfiles.find(
          (p2) => p2.actor.id == p.profile!.actor.id,
        );
        if (prof === undefined) {
          scrollProfiles.push(p.profile!);
        } else {
          scrollProfiles.splice(scrollProfiles.indexOf(prof), 1);
          scrollProfiles.push(p.profile!);
        }
      });
      setProfiles(scrollProfiles);
      setThreads(scrollPosts);
    });
    if (tokenStorage.contains("token")) {
      getCurrentProfile()
        .then((profile) => {
          setCurrentProfile(profile);
        })
        .catch(() => tokenStorage.delete("token"));
    }
  }, []);

  return (
    <View
      className={
        "flex flex-row relative justify-center min-w-full h-screen mx-auto bg-not-quite-dark-blue overflow-y-auto"
      }
    >
      <View className="px-5">
        <PostList
          threads={threads.sort(
            (a, b) => b.post.indexed_ts - a.post.indexed_ts,
          )}
          profiles={profiles}
        />
      </View>
      <Sidebar />
    </View>
  );
}
