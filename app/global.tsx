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

import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { getCurrentProfile, Profile, scrollGlobal, Thread } from "@/lib/api";
import PostList from "@/components/PostList";
import { View } from "react-native";
import {
  tokenStorage,
  useThreadStore,
  useProfileStore,
  useCurrentProfileStore,
} from "@/lib/state";

export default function GlobalFeed() {
  const insertTracks = useThreadStore((state) => state.insertTracks);
  const insertProfiles = useProfileStore((state) => state.insertProfiles);
  const setCurrentProfile = useCurrentProfileStore((state) => state.setProfile);

  const tracks = useThreadStore((state) => state.threads);
  const profiles = useProfileStore((state) => state.profiles);

  useEffect(() => {
    scrollGlobal().then((scrollPosts) => {
      const scrollProfiles: Profile[] = [];

      scrollPosts.forEach((p) => {
        if (p.profile) {
          scrollProfiles.push(p.profile);
        }
      });
      insertProfiles(scrollProfiles);
      insertTracks(scrollPosts);
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
          threads={tracks
            .values()
            .toArray()
            .filter((value) => {
              if (value.track.parent_id === null) {
                return value;
              }
            })
            .sort((a, b) => b.track.indexed_ts - a.track.indexed_ts)}
          profiles={profiles}
        />
      </View>
      <Sidebar />
    </View>
  );
}
