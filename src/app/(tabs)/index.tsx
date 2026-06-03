import { images } from "@/constants/images";
import { Image, Pressable, ScrollView, Text, View } from "@/tw";
import { useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useStore, clearAppStorage } from "@/store/useStore";
import { languages } from "@/data/languages";
import { Alert } from "react-native";

export default function Index() {
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  const { selectedLanguageId, setSelectedLanguageId } = useStore();
  
  const currentLanguage = languages.find(l => l.id === selectedLanguageId);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  const handleClearStorage = async () => {
    try {
      setSelectedLanguageId(null);
      await clearAppStorage();
      Alert.alert("Success", "AsyncStorage cleared! You will be routed to select a language.");
    } catch (e) {
      console.error("Clear storage error", e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        className="flex-1 bg-surface"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="px-6 pt-6 pb-4 bg-white border-b-2 border-border-primary flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <Image
              source={images.mascotLogo}
              className="w-12 h-12"
              contentFit="contain"
            />
            <Text className="text-3xl font-poppins-bold text-text-primary">
              lingua
            </Text>
          </View>
          <View className="flex-row items-center gap-1 bg-surface px-3 py-1.5 rounded-full border border-border-primary">
            <Image
              source={images.streakFire}
              className="w-5 h-5"
              contentFit="contain"
            />
            <Text className="text-sm font-poppins-semibold text-streak">3</Text>
          </View>
        </View>

        {/* CHOOSE LANGUAGE CARD */}
        <View className="px-6 pt-6">
          <Pressable
            onPress={() => router.push("/language-select")}
            className="bg-white border-2 border-border-primary border-b-4 rounded-3xl p-5 flex-row items-center justify-between active:opacity-95"
          >
            <View className="flex-row items-center gap-4 flex-1">
              <View className="bg-blue-50 p-2.5 rounded-2xl border border-blue-100 w-14 h-14 items-center justify-center">
                <Text className="text-3xl">{currentLanguage?.flag || "🌐"}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-poppins-bold text-base text-text-primary">
                  Learning: {currentLanguage?.name || "None"}
                </Text>
                <Text className="text-xs font-poppins text-text-secondary mt-0.5">
                  Tap to change your target language
                </Text>
              </View>
            </View>
            <View className="w-2.5 h-2.5 border-t-2 border-r-2 border-text-secondary rotate-45 mr-1" />
          </Pressable>
        </View>

        {/* LAUNCH ONBOARDING SCREEN CARD */}
        <View className="px-6 pt-6">
          <Pressable
            onPress={() => router.push("/onboarding")}
            className="bg-white border-2 border-border-primary border-b-4 rounded-3xl p-5 flex-row items-center justify-between active:opacity-95"
          >
            <View className="flex-row items-center gap-4 flex-1">
              <View className="bg-purple-100 p-2.5 rounded-2xl border border-purple-200">
                <Image
                  source={images.mascotWelcome}
                  className="w-10 h-10"
                  contentFit="contain"
                />
              </View>
              <View className="flex-1">
                <Text className="font-poppins-bold text-base text-text-primary">
                  View Onboarding Screen
                </Text>
                <Text className="text-xs font-poppins text-text-secondary mt-0.5">
                  Launch the beautiful winking mascot welcome page
                </Text>
              </View>
            </View>
            <View className="w-2.5 h-2.5 border-t-2 border-r-2 border-text-secondary rotate-45 mr-1" />
          </Pressable>
        </View>
        {/* BRAND HEADER SECTION */}

        {/* HERO MASCOT SECTION */}
        <View className="px-6 py-6">
          <View className="bg-white border-2 border-border-primary border-b-4 rounded-3xl p-6 flex-row items-center gap-4">
            <Image
              source={images.mascotWelcome}
              className="w-24 h-24"
              contentFit="contain"
            />
            <View className="flex-1">
              <View className="bg-surface border border-border-primary rounded-2xl p-3 relative">
                <Text className="text-sm font-poppins-medium text-text-primary leading-snug">
                  Welcome{user?.emailAddresses?.[0]?.emailAddress ? `, ${user.emailAddresses[0].emailAddress}` : ""}! Here is our beautiful brand design system. Click any button to test interactive feedback!
                </Text>
                <View className="absolute left-[-6px] top-8 w-3 h-3 bg-surface border-l border-b border-border-primary rotate-45" />
              </View>
            </View>
          </View>
        </View>

        <View className="px-6 mb-4">
          <Pressable
            onPress={handleClearStorage}
            className="btn-3d btn-white bg-slate-50 border-slate-200"
          >
            <Text className="text-text-primary font-poppins-bold text-base text-center">
              CLEAR STORAGE (TEST SELECT)
            </Text>
          </Pressable>
        </View>

        <View className="px-6 mb-6">
          <Pressable
            onPress={handleSignOut}
            className="btn-3d btn-white bg-red-50 border-red-200"
          >
            <Text className="text-red-500 font-poppins-bold text-base">
              SIGN OUT
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
