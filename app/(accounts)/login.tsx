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
import {
  View,
  Text,
  TextInput,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { userLogin } from "@/lib/api";
import { Link, useRouter } from "expo-router";
import { tokenStorage } from "@/lib/state";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: { password: string; email: string }) => {
    const [token, _] = await userLogin(data.email, data.password);

    tokenStorage.set("token", token);

    router.push("/");
  };

  return (
    <View>
      <ImageBackground
        source={require("../../assets/images/beams.jpg")}
        resizeMode="cover"
        resizeMethod="scale"
        style={styles.container}
        width={1392.2}
        height={928}
      >
        <View className="flex flex-col justify-center h-screen lg:items-start sm:items-center lg:pl-32 backdrop-blur-[8px]">
          <View className="flex flex-col justify-center items-center bg-tender-surrender/70 dark:bg-primary/85 py-8 sm:rounded-3xl">
            <Text className="text-primary dark:text-white text-2xl font-main font-bold">
              Welcome to Derailed!
            </Text>
            <Text className="text-primary dark:text-gray-300 text-xl font-light font-main pb-3 italic">
              We're glad to have you coming back
            </Text>
            <View className="black-glass-50 dark:white-glass-50 gap-5 xl:gap-10 xl:p-10 p-7 rounded-2xl">
              <View className="gap-2 lg:gap-3 min-w-80 xl:min-w-96">
                <Text className="text-primary dark:text-gray-300 text-lg font-main">
                  Email
                </Text>
                <Controller
                  // @ts-ignore
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="text-xl text-primary dark:text-white placeholder:italic p-2 rounded-lg border border-primary dark:border-white font-main"
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
                <Text className="text-primary dark:text-gray-300 text-lg font-main">
                  Password
                </Text>
                <Controller
                  // @ts-ignore
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      className="text-xl text-primary dark:text-white placeholder:italic p-2 rounded-lg border border-primary dark:border-white font-main"
                      placeholder="lactatingpregnantlatinas"
                      onBlur={onBlur}
                      textContentType="password"
                      secureTextEntry={true}
                      onChange={onChange}
                      value={value}
                    />
                  )}
                  name="password"
                ></Controller>
              </View>
              <View className="flex items-center gap-3 w-full">
                <Pressable
                  className="bg-brand w-full rounded-lg p-2"
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-white text-center text-lg font-main">
                    Login
                  </Text>
                </Pressable>
                <Link href="/(accounts)/register" className="w-full">
                  <View className="border border-primary dark:border-white p-2 w-full rounded-lg">
                    <Text className="text-primary text-center dark:text-white text-lg font-main">
                      Register
                    </Text>
                  </View>
                </Link>
              </View>
            </View>
          </View>
          <View className="flex justify-center items-center lg:items-start mt-5">
            <Link href="https://unsplash.com/@mo_design_3d">
              <Text className="text-brand text-center lg:text-left">
                Photo by Mo on Unsplash
              </Text>
            </Link>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
