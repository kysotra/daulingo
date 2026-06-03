import { images } from "@/constants/images";
import { languages } from "@/data/languages";
import { useStore } from "@/store/useStore";
import { Image, Pressable, ScrollView, Text, View } from "@/tw";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TextInput, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LanguageSelect() {
  const router = useRouter();
  const { selectedLanguageId, setSelectedLanguageId } = useStore();
  const [tempSelectedId, setTempSelectedId] = useState<string>(selectedLanguageId || "es");
  const [searchQuery, setSearchQuery] = useState("");

  const handleConfirm = () => {
    setSelectedLanguageId(tempSelectedId);
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/" as any);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else if (selectedLanguageId) {
      router.replace("/" as any);
    } else {
      router.replace("/onboarding");
    }
  };

  const showBackButton = router.canGoBack() || !!selectedLanguageId;

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      {/* HEADER */}
      <View className="px-6 py-4 flex-row items-center justify-between border-b border-slate-100">
        {showBackButton ? (
          <Pressable
            onPress={handleBack}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-slate-50 border border-slate-100"
          >
            <Ionicons name="chevron-back" size={22} color="#0D132B" />
          </Pressable>
        ) : (
          <View className="w-10 h-10" />
        )}
        <Text className="text-[18px] font-poppins-bold text-text-primary text-center">
          Choose a language
        </Text>
        <View className="w-10 h-10" />
      </View>

      <ScrollView
        className="flex-1 bg-white px-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* SEARCH BAR */}
        <View className="flex-row items-center bg-[#F6F7FB] border border-[#E5E7EB] rounded-2xl px-4 py-3 mt-5 gap-3">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search languages"
            placeholderTextColor="#6B7280"
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={18} color="#9CA3AF" />
            </Pressable>
          )}
        </View>

        {/* POPULAR HEADER */}
        <Text className="text-[18px] font-poppins-bold text-text-primary mt-6 mb-3">
          Popular
        </Text>

        {/* LANGUAGE LIST */}
        <View className="w-full">
          {filteredLanguages.length > 0 ? (
            filteredLanguages.map((lang) => {
              const isSelected = tempSelectedId === lang.id;
              return (
                <Pressable
                  key={lang.id}
                  onPress={() => setTempSelectedId(lang.id)}
                  className={`flex-row items-center justify-between p-4 mb-3 border-2 rounded-[20px] transition-all ${
                    isSelected
                      ? "bg-[#F0EDFF] border-[#6C4EF5] border-b-[4px]"
                      : "bg-white border-[#E5E7EB] border-b-[4px] active:bg-slate-50"
                  }`}
                >
                  <View className="flex-row items-center gap-4 flex-1">
                    {/* Circular Flag Container */}
                    <View className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 items-center justify-center shadow-sm">
                      <Text className="text-2xl" style={styles.flagText}>
                        {lang.flag}
                      </Text>
                    </View>
                    
                    {/* Names */}
                    <View className="flex-1">
                      <Text className="font-poppins-semibold text-base text-text-primary">
                        {lang.name}
                      </Text>
                      {lang.learners && (
                        <Text className="text-xs font-poppins text-text-secondary mt-0.5">
                          {lang.learners}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* Selection Indicator */}
                  <View className="ml-2">
                    {isSelected ? (
                      <Ionicons name="checkmark-circle" size={24} color="#6C4EF5" />
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                    )}
                  </View>
                </Pressable>
              );
            })
          ) : (
            <View className="py-10 items-center justify-center">
              <Text className="text-sm font-poppins text-text-secondary">
                No languages found matching &quot;{searchQuery}&quot;
              </Text>
            </View>
          )}
        </View>

        {/* EARTH ILLUSTRATION */}
        <View className="items-center justify-center mt-6 w-full">
          <Image
            source={images.earth}
            className="w-full h-48"
            contentFit="contain"
          />
        </View>
      </ScrollView>

      {/* CONFIRMATION BUTTON CONTAINER */}
      <View className="px-6 pb-6 pt-3 border-t border-slate-100 bg-white">
        <Pressable
          onPress={handleConfirm}
          className="btn-3d btn-green py-4 items-center justify-center"
        >
          <Text className="text-white font-poppins-bold text-[18px]">
            CONFIRM
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#0D132B",
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
  },
  flagText: {
    ...Platform.select({
      android: {
        // Fix for flag emojis not rendering properly on some Android systems
        fontSize: 24,
      },
    }),
  },
});
