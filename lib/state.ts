/*
   Copyright 2024-2025 V.J. De Chico

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

import { MMKV } from "react-native-mmkv";
import { create } from "zustand";
import { Profile, Thread } from "./api";

export const tokenStorage = new MMKV({
  id: "derailed-token-storage",
});

export interface CurrentProfileStore {
  currentProfile: Profile | null;
  setProfile: (profile: Profile) => void;
}

export const useCurrentProfileStore = create<CurrentProfileStore>((set) => ({
  currentProfile: null,
  setProfile: (profile) => set({ currentProfile: profile }),
}));

export interface CurrentTrackStore {
  currentTrack: Thread | null;
  setTrack: (thread: Thread) => void;
}

export const useCurrentTrackStore = create<CurrentTrackStore>((set) => ({
  currentTrack: null,
  setTrack: (thread: Thread) => set({ currentTrack: thread }),
}));
