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

import { Image, Pressable, View } from "react-native";

export default function LogoHead() {
  return (
    <View className="max-md:hidden lg:pb-2">
      <Image
        className="max-h-[20.8px] max-w-[24px] lg:max-h-[33.7px] lg:max-w-[38.9px] lg:hidden"
        source={require("../assets/images/blub_icon_brand_RGB.svg")}
      />
      <Image
        className="hidden lg:block h-fit max-w-[128px] max-h-[24px]"
        source={require("../assets/images/blub_logo_brand_RGB.svg")}
      />
    </View>
  );
}
