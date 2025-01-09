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

import { getCurrentProfile, Profile, userEdit } from "@/lib/api";
import { tokenStorage, useCurrentProfileStore } from "@/lib/state";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TextInput, View } from "react-native";

export default function EditSelfModal() {
  const currentUserQuery = useQuery({
    queryKey: ["currentProfile"],
    queryFn: async () => {
      if (tokenStorage.contains("token")) {
        return await getCurrentProfile();
      }
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      oldPassword: "",
      email: "",
      displayName: currentUserQuery.data?.actor.display_name || "",
      bio: currentUserQuery.data?.actor.bio || "",
      status: currentUserQuery.data?.actor.status || "",
    },
  });
  const router = useRouter();
  const mutate = useMutation({
    mutationKey: ["currentUser"],
    mutationFn: async (data: {
      password: string | undefined;
      email: string | undefined;
      oldPassword: string | undefined;
      displayName: string | undefined;
      bio: string | undefined;
      status: string | undefined;
    }) => {
      return await userEdit(
        replaceIfEmpty(data.email),
        replaceIfEmpty(data.password),
        replaceIfEmpty(data.oldPassword),
        replaceIfEmpty(data.displayName),
        replaceIfEmpty(data.bio),
        replaceIfEmpty(data.status),
      );
    },
  });

  const replaceIfEmpty = (content: string | undefined) => {
    if (content === "") {
      return undefined;
    } else {
      return content;
    }
  };
  const onSubmit = async (data: {
    password: string | undefined;
    email: string | undefined;
    oldPassword: string | undefined;
    displayName: string | undefined;
    bio: string | undefined;
    status: string | undefined;
  }) => {
    if (data.password !== "" && data.oldPassword === "") {
      return;
    }
    if (data.email !== "" && data.oldPassword === "") {
      return;
    }

    if (data.oldPassword === "") {
      data.oldPassword = undefined;
    }
    if (data.email === "") {
      data.email = undefined;
    }
    if (data.password === "") {
      data.password = undefined;
    }
    if (data.bio === currentUserQuery.data?.actor.bio) {
      data.bio = undefined;
    }
    if (data.displayName === currentUserQuery.data?.actor.display_name) {
      data.displayName = undefined;
    }
    if (data.status === currentUserQuery.data?.actor.status) {
      data.status = undefined;
    }

    await mutate.mutateAsync(data);

    router.push("/@me");
  };

  return (
    <View className="flex-1 flex justify-center items-center bg-transparent backdrop-blur-sm backdrop-opacity-95 backdrop-brightness-50 scroll-smooth overflow-y-auto">
      <View className="min-w-72 p-6 bg-secondary/85 rounded-md gap-4">
        <Text className="text-white text-xl font-main font-bold">
          Edit Yourself
        </Text>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-secondary dark:text-gray-300 text-lg font-main">
            Display Name
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl text-secondary dark:text-white placeholder:italic p-2 rounded-lg border border-secondary dark:border-white font-main"
                placeholder="Work Work"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="displayName"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-secondary dark:text-gray-300 text-lg font-main">
            Bio
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl text-secondary dark:text-white placeholder:italic p-2 rounded-lg border border-secondary dark:border-white font-main"
                placeholder="I am people, because people is me."
                onBlur={onBlur}
                multiline={true}
                onChange={onChange}
                value={value}
              />
            )}
            name="bio"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-secondary dark:text-gray-300 text-lg font-main">
            Status
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl text-secondary dark:text-white placeholder:italic p-2 rounded-lg border border-secondary dark:border-white font-main"
                placeholder="THE BRITISH ARE COMING!"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="status"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-secondary dark:text-gray-300 text-lg font-main">
            New Email
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl text-secondary dark:text-white placeholder:italic p-2 rounded-lg border border-secondary dark:border-white font-main"
                placeholder="godsend@zeus.gods"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
              />
            )}
            name="email"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-secondary dark:text-gray-300 text-lg font-main">
            New Password
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl text-secondary dark:text-white placeholder:italic p-2 rounded-lg border border-secondary dark:border-white font-main"
                placeholder="boombam"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                secureTextEntry={true}
                textContentType="newPassword"
              />
            )}
            name="password"
          ></Controller>
        </View>

        <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
          <Text className="text-secondary dark:text-gray-300 text-lg font-main">
            Old Password
          </Text>
          <Controller
            // @ts-ignore
            control={control}
            rules={{ required: false }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="text-xl text-secondary dark:text-white placeholder:italic p-2 rounded-lg border border-secondary dark:border-white font-main"
                placeholder="boombam"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                secureTextEntry={true}
                textContentType="password"
              />
            )}
            name="oldPassword"
          ></Controller>
        </View>

        <Pressable
          className="bg-brand w-full rounded-lg p-2"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-center text-lg font-main">
            Edit my Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
