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

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "./global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    Satoshi: require("../assets/fonts/Satoshi-Variable.ttf"),
    SatoshiItalic: require("../assets/fonts/Satoshi-VariableItalic.ttf"),
    MonaspaceNeon: require("../assets/fonts/MonaspaceNeon-Variable.ttf"),
  });
  useFonts({
    AppleColorEmoji: require("../assets/fonts/AppleColorEmoji.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(accounts)/login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(accounts)/register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="[user]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(threads)/t/[thread_id]/index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="compose"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(threads)/t/[thread_id]/reply"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="edit-self"
          options={{
            presentation: "transparentModal",
            animation: "fade",
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
