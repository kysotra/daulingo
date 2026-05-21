import { images } from "@/constants/images";
import { Image, Pressable, ScrollView, Text, View } from "@/tw";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Onboarding() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/sign-up");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView 
        className="flex-1 bg-white"
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 px-8 pt-8 pb-10 justify-between items-center">
          
          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Image 
              source={images.mascotLogo} 
              className="w-9 h-9"
              contentFit="contain"
            />
            <Text className="text-[22px] font-poppins-bold text-text-primary">
              Duolingo
            </Text>
          </View>

          <View className="items-left w-full mt-8">
            <Text className="text-[32px] font-poppins-bold text-text-primary text-left leading-[1.2] mb-3">
              Your AI language{"\n"}<Text className="text-lingua-purple">teacher</Text>.
            </Text>
            <Text className="text-[16px] font-poppins text-text-secondary text-left leading-[1.6] px-2">
              Real conversations, personalized{"\n"}lessons, anytime, anywhere.
            </Text>
          </View>

          <View className="relative w-full items-center justify-center my-6 flex-1 min-h-[320px]">
            
            <View 
              className="absolute left-[20px] top-20 bg-[#EBF3FF] border border-[#C2DBFF] px-4 py-2.5 rounded-2xl z-10 shadow-sm"
              style={{
                shadowColor: "#4D8BFF",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <Text className="text-[16px] font-poppins-bold text-text-primary">
                Hello!
              </Text>
              <View className="absolute bottom-[-5px] right-6 w-3 h-3 bg-[#EBF3FF] border-r border-b border-[#C2DBFF] rotate-45" />
            </View>

            <View 
              className="absolute right-30 top-10 bg-[#F0EDFF] border border-[#DDD6FF] px-4 py-2.5 rounded-2xl z-10 shadow-sm"
              style={{
                shadowColor: "#6C4EF5",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <Text className="text-[16px] font-poppins-bold text-lingua-purple">
                ¡Hola!
              </Text>
              <View className="absolute bottom-[-5px] left-6 w-3 h-3 bg-[#F0EDFF] border-r border-b border-[#DDD6FF] rotate-45" />
            </View>

            <View 
              className="absolute right-[10px] top-35 bg-[#FFF0EB] border border-[#FFD3C4] px-4 py-2.5 rounded-2xl z-10 shadow-sm"
              style={{
                shadowColor: "#FF4D4F",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 4,
              }}
            >
              <Text className="text-[16px] font-poppins-bold text-[#FF4D4F]">
                你好!
              </Text>
              <View className="absolute bottom-[-5px] left-5 w-3 h-3 bg-[#FFF0EB] border-r border-b border-[#FFD3C4] rotate-45" />
            </View>

            <Image 
              source={images.mascotWelcome} 
              className="w-100 h-100"
              contentFit="contain"
            />
          </View>

          <View className="w-full mt-4">
            <Pressable 
              onPress={handleGetStarted}
              className="bg-lingua-purple py-4 rounded-[20px] flex-row items-center justify-between px-6 active:opacity-95 shadow-sm"
              style={{
                height: 58,
              }}
            >
              <View className="w-5" />
              <Text className="text-white font-poppins-bold text-[18px] text-center flex-1">
                Get Started
              </Text>
              <View className="w-2.5 h-2.5 border-t-3 border-r-3 border-white rotate-45 mr-1" />
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
