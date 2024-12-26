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

import * as React from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { Controller, useForm } from "react-hook-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { createUser } from "@/lib/api";
import { useLinkProps } from "@react-navigation/native";

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
      username: ""
    },
  });

  const router = useRouter();

  const onSubmit = async (data: { password: string; username: string; email: string }) => {
    const [token, _] = await createUser(data.email, data.username, data.password);
    await AsyncStorage.setItem("token", token);
    router.push("/global");
  };

  return (
    <View className="bg-white dark:bg-black flex flex-col justify-center items-center h-screen">
      <Text className="text-brand dark:text-white text-2xl font-main font-bold">
        Welcome to Derailed!
      </Text>
      <Text className="text-black dark:text-gray-300 text-xl font-light font-main pb-3 italic">
        We're glad to have you riding along!
      </Text>
      <View className="black-glass-50 dark:white-glass-50 gap-5 xl:gap-10 xl:p-10 p-7 rounded-2xl">
      <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-black dark:text-gray-300 text-lg font-main">Username</Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl dark:text-white placeholder:text-gray-400 placeholder:italic p-2 rounded-lg border-2 border-black dark:border-white font-main"
                placeholder="zeus"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="username"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-black dark:text-gray-300 text-lg font-main">Email</Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl dark:text-white placeholder:text-gray-400 placeholder:italic p-2 rounded-lg border-2 border-black dark:border-white font-main"
                placeholder="godsend@zeus.gods"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="email"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3">
          <Text className="text-black dark:text-gray-300 text-lg font-main">
            Password
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl dark:text-white placeholder:text-gray-400 placeholder:italic p-2 rounded-lg border-2 border-black dark:border-white font-main"
                placeholder="lactatingpregnantlatinas"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="password"
          ></Controller>
        </View>
        <Pressable
          className="border-2 border-black dark:border-white rounded-lg p-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-not-quite-dark-blue dark:text-white text-center text-lg font-main">
            Create my account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}