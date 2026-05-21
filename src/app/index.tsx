import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable, Image } from "@/tw";
import { images } from "@/constants/images";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView 
        className="flex-1 bg-surface"
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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
                  Welcome! Here is our beautiful brand design system. Click any button to test interactive feedback!
                </Text>
                <View className="absolute left-[-6px] top-8 w-3 h-3 bg-surface border-l border-b border-border-primary rotate-45" />
              </View>
            </View>
          </View>
        </View>

        {/* TYPOGRAPHY SYSTEM */}
        <View className="px-6 mb-6">
          <Text className="text-xs font-poppins-bold text-lingua-purple uppercase tracking-wider mb-3">
            Typography System (Poppins)
          </Text>
          <View className="bg-white border-2 border-border-primary rounded-3xl p-5 gap-5">
            <View className="border-b border-border-primary pb-3">
              <Text className="h1 mb-1">H1 Title</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Page / Screen Title • 32px • Bold • LH 1.2 • className=&quot;h1&quot;
              </Text>
            </View>

            <View className="border-b border-border-primary pb-3">
              <Text className="h2 mb-1">H2 Section Title</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Section Title • 24px • SemiBold • LH 1.3 • className=&quot;h2&quot;
              </Text>
            </View>

            <View className="border-b border-border-primary pb-3">
              <Text className="h3 mb-1">H3 Card Title</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Card / Module Title • 20px • SemiBold • LH 1.3 • className=&quot;h3&quot;
              </Text>
            </View>

            <View className="border-b border-border-primary pb-3">
              <Text className="h4 mb-1">H4 Subheading</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Subheading • 16px • Medium • LH 1.4 • className=&quot;h4&quot;
              </Text>
            </View>

            <View className="border-b border-border-primary pb-3">
              <Text className="body-lg mb-1">Body Large Text</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Important Content • 16px • Regular • LH 1.6 • className=&quot;body-lg&quot;
              </Text>
            </View>

            <View className="border-b border-border-primary pb-3">
              <Text className="body-md mb-1">Body Medium Text</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Body Text • 14px • Regular • LH 1.6 • className=&quot;body-md&quot;
              </Text>
            </View>

            <View className="border-b border-border-primary pb-3">
              <Text className="body-sm mb-1">Body Small Text</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Supporting Text • 13px • Regular • LH 1.6 • className=&quot;body-sm&quot;
              </Text>
            </View>

            <View>
              <Text className="caption mb-1 uppercase tracking-wider">Caption Text</Text>
              <Text className="text-xs font-poppins text-text-secondary">
                Labels, Meta Text • 11px • Regular • LH 1.4 • className=&quot;caption&quot;
              </Text>
            </View>
          </View>
        </View>

        {/* COLORS SYSTEM */}
        <View className="px-6 mb-6">
          <Text className="text-xs font-poppins-bold text-lingua-purple uppercase tracking-wider mb-3">
            Color Palette Mappings
          </Text>
          <View className="bg-white border-2 border-border-primary rounded-3xl p-5 gap-6">
            
            <View>
              <Text className="text-sm font-poppins-semibold text-text-primary mb-3">Brand Colors</Text>
              <View className="flex-row flex-wrap gap-4">
                <View className="flex-1 min-w-[40%] items-center">
                  <View className="w-full h-14 bg-lingua-purple rounded-2xl border-b-4 border-lingua-deep-purple" />
                  <Text className="text-xs font-poppins-semibold text-text-primary mt-2">Purple</Text>
                  <Text className="text-[10px] font-poppins text-text-secondary">#6C4EF5</Text>
                </View>
                <View className="flex-1 min-w-[40%] items-center">
                  <View className="w-full h-14 bg-lingua-deep-purple rounded-2xl" />
                  <Text className="text-xs font-poppins-semibold text-text-primary mt-2">Deep Purple</Text>
                  <Text className="text-[10px] font-poppins text-text-secondary">#5B3BF6</Text>
                </View>
                <View className="flex-1 min-w-[40%] items-center">
                  <View className="w-full h-14 bg-lingua-blue rounded-2xl border-b-4 border-[#3B72E2]" />
                  <Text className="text-xs font-poppins-semibold text-text-primary mt-2">Blue</Text>
                  <Text className="text-[10px] font-poppins text-text-secondary">#4D8BFF</Text>
                </View>
                <View className="flex-1 min-w-[40%] items-center">
                  <View className="w-full h-14 bg-lingua-green rounded-2xl border-b-4 border-[#199F56]" />
                  <Text className="text-xs font-poppins-semibold text-text-primary mt-2">Green</Text>
                  <Text className="text-[10px] font-poppins text-text-secondary">#21C16B</Text>
                </View>
              </View>
            </View>

            <View className="border-t border-border-primary pt-4">
              <Text className="text-sm font-poppins-semibold text-text-primary mb-3">Semantic Colors</Text>
              <View className="flex-row flex-wrap gap-4">
                <View className="flex-1 min-w-[28%] items-center">
                  <View className="w-full h-10 bg-success rounded-xl" />
                  <Text className="text-[10px] font-poppins-semibold text-text-primary mt-1">Success</Text>
                  <Text className="text-[9px] font-poppins text-text-secondary">#21C16B</Text>
                </View>
                <View className="flex-1 min-w-[28%] items-center">
                  <View className="w-full h-10 bg-warning rounded-xl" />
                  <Text className="text-[10px] font-poppins-semibold text-text-primary mt-1">Warning</Text>
                  <Text className="text-[9px] font-poppins text-text-secondary">#FFC800</Text>
                </View>
                <View className="flex-1 min-w-[28%] items-center">
                  <View className="w-full h-10 bg-streak rounded-xl" />
                  <Text className="text-[10px] font-poppins-semibold text-text-primary mt-1">Streak</Text>
                  <Text className="text-[9px] font-poppins text-text-secondary">#FF8A00</Text>
                </View>
                <View className="flex-1 min-w-[28%] items-center">
                  <View className="w-full h-10 bg-error rounded-xl" />
                  <Text className="text-[10px] font-poppins-semibold text-text-primary mt-1">Error</Text>
                  <Text className="text-[9px] font-poppins text-text-secondary">#FF4D4F</Text>
                </View>
                <View className="flex-1 min-w-[28%] items-center">
                  <View className="w-full h-10 bg-info rounded-xl" />
                  <Text className="text-[10px] font-poppins-semibold text-text-primary mt-1">Info</Text>
                  <Text className="text-[9px] font-poppins text-text-secondary">#4D8BFF</Text>
                </View>
                <View className="flex-1 min-w-[28%] opacity-0" />
              </View>
            </View>

            <View className="border-t border-border-primary pt-4">
              <Text className="text-sm font-poppins-semibold text-text-primary mb-3">Neutrals</Text>
              <View className="flex-row flex-wrap gap-4">
                <View className="flex-1 min-w-[40%] items-center flex-row gap-2 bg-surface p-2 rounded-xl border border-border-primary">
                  <View className="w-8 h-8 bg-text-primary rounded-lg" />
                  <View>
                    <Text className="text-[10px] font-poppins-semibold text-text-primary">Text Prim</Text>
                    <Text className="text-[9px] font-poppins text-text-secondary">#0D132B</Text>
                  </View>
                </View>
                <View className="flex-1 min-w-[40%] items-center flex-row gap-2 bg-surface p-2 rounded-xl border border-border-primary">
                  <View className="w-8 h-8 bg-text-secondary rounded-lg" />
                  <View>
                    <Text className="text-[10px] font-poppins-semibold text-text-primary">Text Sec</Text>
                    <Text className="text-[9px] font-poppins text-text-secondary">#6B7280</Text>
                  </View>
                </View>
                <View className="flex-1 min-w-[40%] items-center flex-row gap-2 bg-surface p-2 rounded-xl border border-border-primary">
                  <View className="w-8 h-8 bg-border-primary rounded-lg" />
                  <View>
                    <Text className="text-[10px] font-poppins-semibold text-text-primary">Border</Text>
                    <Text className="text-[9px] font-poppins text-text-secondary">#E5E7EB</Text>
                  </View>
                </View>
                <View className="flex-1 min-w-[40%] items-center flex-row gap-2 bg-surface p-2 rounded-xl border border-border-primary">
                  <View className="w-8 h-8 bg-surface rounded-lg border border-border-primary" />
                  <View>
                    <Text className="text-[10px] font-poppins-semibold text-text-primary">Surface</Text>
                    <Text className="text-[9px] font-poppins text-text-secondary">#F6F7FB</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* PLAYFUL ELEMENTS */}
        <View className="px-6 mb-6">
          <Text className="text-xs font-poppins-bold text-lingua-purple uppercase tracking-wider mb-3">
            Playful 3D Components
          </Text>
          <View className="bg-white border-2 border-border-primary rounded-3xl p-5 gap-4">
            <Text className="text-sm font-poppins-semibold text-text-primary mb-1">
              Custom Interactive Buttons
            </Text>

            <Pressable className="btn-3d btn-purple">
              <Text className="text-white font-poppins-bold text-base">
                LINGUA PURPLE BUTTON
              </Text>
            </Pressable>

            <Pressable className="btn-3d btn-blue">
              <Text className="text-white font-poppins-bold text-base">
                LINGUA BLUE BUTTON
              </Text>
            </Pressable>

            <Pressable className="btn-3d btn-green">
              <Text className="text-white font-poppins-bold text-base flex-row items-center gap-2">
                LINGUA GREEN BUTTON
              </Text>
            </Pressable>

            <Pressable className="btn-3d btn-white">
              <Text className="text-text-primary font-poppins-bold text-base">
                WHITE SHADOW BUTTON
              </Text>
            </Pressable>

            <Text className="text-sm font-poppins-semibold text-text-primary mt-4 mb-1">
              Playful Card Container (card-3d)
            </Text>
            <View className="card-3d p-5">
              <Text className="font-poppins-bold text-lg text-text-primary mb-1">
                Friendly Card Title
              </Text>
              <Text className="body-sm">
                This card uses the .card-3d utility style. It has a rounded outline, soft borders, and an offset bottom border mimicking premium gaming learning apps!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
