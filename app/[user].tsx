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
import { getCurrentProfile, getProfile, getUserPosts, Post, Profile } from "@/lib/api";
import PostList from "@/components/PostList";
import { View } from "react-native";
import { tokenStorage } from "@/lib/state";
import LogoHead from "@/components/LogoHead";
import { useLocalSearchParams, useRouter } from "expo-router";
import NotFoundScreen from "./+not-found";
import ProfileDisplay from "@/components/ProfileDisplay";

// TODO: support handles
export default function UserProfile() {
  const localParams = useLocalSearchParams();
  const user = localParams.user as string;
  const router = useRouter();

  const [thisProfile, setThisProfile] = useState<Profile | null>(null);

  var isMe: boolean = false;

  if (user.startsWith("@")) {
    if (user == "@me") {
      isMe = true;
    } else {
      return <NotFoundScreen />;
    }
  } else if (user.startsWith("!")) {
    isMe = false;
  } else {
    return <NotFoundScreen />;
  }

  const [posts, setPosts] = useState<Post[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [found, setFound] = useState(true);

  useEffect(() => {
      if (tokenStorage.contains("token")) {
          getCurrentProfile().then((profile) => {
              setCurrentProfile(profile);
          }).catch(() => tokenStorage.delete("token"));
      }
      if (isMe) {
        if (!currentProfile) {
          router.push("..");
        } else {
          setThisProfile(currentProfile!);
        }
      } else {
        getProfile(user.replace("!", "")).then((profile) => {
          setThisProfile(profile);
        });
      }
      if (!thisProfile) {
        setFound(false);
        return;
      }

      getUserPosts(thisProfile!.actor.id).then((scrollPosts) => {
        const scrollProfiles: Profile[] = [thisProfile!];

        scrollPosts.forEach(p => {
            if (!profiles.find((profile) => profile.actor.id === p.author_id) && p.author_id !== null) {
                getProfile(p.author_id!).then((profile) => scrollProfiles.push(profile))
            }
        });
        setProfiles(scrollProfiles);
        setPosts(scrollPosts);
      });
  }, []);

  return (
      (found ? (<View className={"flex flex-row justify-center min-w-full m-auto bg-not-quite-dark-blue gap-4"}>
          <Sidebar />
          <View className="border-l border-r border-white">
              <LogoHead />
              <ProfileDisplay profile={thisProfile} />
              <PostList posts={posts} profiles={profiles} />
          </View>
      </View>) : (
        <NotFoundScreen />
      ))
  )
}