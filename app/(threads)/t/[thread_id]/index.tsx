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
import Sidebar from "@/components/Sidebar";
import { getCurrentProfile, getThread, Profile, Thread } from "@/lib/api";
import PostList from "@/components/PostList";
import { Text, View } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import ThreadComp from "@/components/ThreadDisplay";
import {
  tokenStorage,
  useThreadStore,
  useProfileStore,
  useCurrentProfileStore,
  useCurrentTrackStore,
} from "@/lib/state";

export default function ThreadView() {
  const localParams = useLocalSearchParams();
  const thread_id = localParams.thread_id as string;
  const router = useRouter();

  const insertTracks = useThreadStore((state) => state.insertTracks);
  const insertProfiles = useProfileStore((state) => state.insertProfiles);
  const setCurrentProfile = useCurrentProfileStore((state) => state.setProfile);
  const setCurrentTrack = useCurrentTrackStore((state) => state.setTrack);

  const tracks = useThreadStore((state) => state.threads);
  const profiles = useProfileStore((state) => state.profiles);
  const currentTrack = useCurrentTrackStore((state) => state.currentTrack);

  useEffect(() => {
    getThread(thread_id)
      .then((thread) => {
        const profs = [];
        if (thread.profile) {
          profs.push(thread.profile);
        }
        thread.children?.forEach((t) => {
          if (t.profile) {
            profs.push(t.profile);
          }
        });
        insertProfiles(profs);

        setCurrentTrack(thread);
        if (thread.children) {
          insertTracks(thread.children);
        }
      })
      .catch((reason) => {
        console.error(reason);
        router.push("..");
      });

    if (tokenStorage.contains("token")) {
      getCurrentProfile()
        .then((profile) => {
          setCurrentProfile(profile);
        })
        .catch(() => tokenStorage.delete("token"));
    }
  }, [thread_id]);

  return (
    <View
      className={
        "flex flex-row justify-center min-w-full h-screen m-auto bg-not-quite-dark-blue gap-4 overflow-y-auto"
      }
    >
      <Sidebar />
      <View className="pt-9">
        {currentTrack && <ThreadComp item={currentTrack} profiles={profiles} />}
        <Link href={`/t/${thread_id}/reply`}>
          <View className="w-full flex justify-start items-start my-4 p-3 rounded-md scale-105 bg-quite-lighter-dark-blue">
            <Text className="text-white/70 font-main">Write your reply...</Text>
          </View>
        </Link>
        <PostList
          threads={tracks
            .values()
            .toArray()
            .filter((value) => {
              if (
                value.track.parent_id === currentTrack?.track.id &&
                currentTrack !== null
              ) {
                return value;
              }
            })
            .sort((a, b) => b.track.indexed_ts - a.track.indexed_ts)}
          profiles={profiles}
        />
      </View>
    </View>
  );
}
