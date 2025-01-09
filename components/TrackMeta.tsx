import { tokenStorage } from "@/lib/state";
import Octicons from "@expo/vector-icons/Octicons";
import { Pressable, Text, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { bookmark, react, Thread, unbookmark, unreact } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function TrackMeta({ item }: { item: Thread }) { 
    const [liked, setLiked] = useState(item.liked);
    const [bookmarked, setBookmarked] = useState(item.bookmarked);

    const [likes, setLikes] = useState(item.likes);
    const [bookmarks, setBookmarks] = useState(item.bookmarks);

    const router = useRouter();

    return (
        <View className="flex flex-row items-center justify-between w-full">
            <Pressable onPress={async () => {
            if (!tokenStorage.contains("token")) {
                return;
            }
            if (!liked) {
                await react(item.track.id);
                setLikes(likes + 1);
            } else {
                await unreact(item.track.id);
                setLikes(likes - 1);
            }

            setLiked(!liked);
            }}>
            <View className="flex flex-row items-center gap-2 p-2 rounded-full hover:bg-tertiary">
                <Octicons name={liked && "heart-fill" || "heart"} size={18} className={liked && "text-brand" || "text-graaaay"}  />
                <Text className="text-graaaay font-main font-medium">{likes}</Text>
            </View>
            </Pressable>
            <Pressable onPress={() => router.push(`/(threads)/t/${item.track.id}/reply`)}>
            <View className="flex flex-row items-center gap-2 p-2 rounded-full hover:bg-tertiary">
                <Octicons name="comment" size={18} className="text-graaaay"  />
                <Text className="text-graaaay font-main font-medium">{item.comments}</Text>
            </View>
            </Pressable>
            <Pressable onPress={async () => {
            if (!tokenStorage.contains("token")) {
                return;
            }
            if (!bookmarked) {
                await bookmark(item.track.id);
                setBookmarks(bookmarks + 1);
            } else {
                await unbookmark(item.track.id);
                setBookmarks(bookmarks - 1);
            }

            setBookmarked(!bookmarked)
            }}>
            <View className="flex flex-row items-center gap-2 p-2 rounded-full hover:bg-tertiary">
                <Octicons name="bookmark" size={18} className={bookmarked && "text-brand" || "text-graaaay"}  />
                <Text className="text-graaaay font-main font-medium">{bookmarks}</Text>
            </View>
            </Pressable>
            <Pressable onPress={async () => await Clipboard.setStringAsync(item.track.content)}>
            <Octicons name="copy" size={18} className="text-graaaay" />
            </Pressable>
        </View>
    )
}