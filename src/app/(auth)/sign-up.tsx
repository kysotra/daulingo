import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { 
  TextInput as RNTextInput, 
  StyleSheet, 
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { View, Text, ScrollView, Pressable, Image } from "@/tw";
import { images } from "@/constants/images";
import VerificationModal from "@/components/VerificationModal";

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("•••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignUp = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          className="flex-1 bg-white"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View className="flex-1 px-6 pt-4 pb-8">
            
            {/* TOP BAR / BACK NAVIGATION */}
            <View className="flex-row items-center mt-2">
              <Pressable 
                onPress={() => router.replace("/onboarding")}
                className="w-10 h-10 items-center justify-center rounded-full active:bg-slate-50 border border-slate-100"
              >
                {/* Visual Chevron Left */}
                <View className="w-3 h-3 border-l-2.5 border-b-2.5 border-text-primary rotate-45 ml-1" />
              </Pressable>
            </View>

            {/* HERO TYPOGRAPHY */}
            <View className="mt-5 mb-4">
              <Text className="text-3xl font-poppins-bold text-text-primary tracking-tight">
                Create your account
              </Text>
              <Text className="text-[15px] font-poppins text-text-secondary mt-1.5">
                Start your language journey today ✨
              </Text>
            </View>

            {/* MASCOT ILLUSTRATION */}
            <View className="items-center justify-center my-3 relative h-36">
              <Image 
                source={images.mascotAuth} 
                className="w-56 h-36"
                contentFit="contain"
              />
            </View>

            {/* FORM CONTAINER */}
            <View className="w-full mt-2">
              
              {/* EMAIL CARD INPUT */}
              <View className="bg-white border-2 border-border-primary rounded-[20px] px-5 py-3 mb-4 focus-within:border-lingua-purple shadow-sm">
                <Text className="text-xs font-poppins-semibold text-text-secondary mb-1">
                  Email
                </Text>
                <RNTextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.textInput}
                />
              </View>

              {/* PASSWORD CARD INPUT */}
              <View className="bg-white border-2 border-border-primary rounded-[20px] px-5 py-3 mb-6 flex-row items-center justify-between shadow-sm">
                <View className="flex-1">
                  <Text className="text-xs font-poppins-semibold text-text-secondary mb-1">
                    Password
                  </Text>
                  <RNTextInput
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    style={styles.textInput}
                  />
                </View>
                
                {/* Eye Show/Hide Toggle */}
                <Pressable 
                  onPress={() => setShowPassword(!showPassword)}
                  className="w-10 h-10 items-center justify-center active:opacity-75"
                >
                  <View className="w-6 h-4 border-2 border-[#6B7280] rounded-full items-center justify-center relative">
                    <View className="w-2.5 h-2.5 bg-[#6B7280] rounded-full" />
                    {showPassword && (
                      <View className="absolute w-7 h-0.5 bg-[#6B7280] rotate-45" />
                    )}
                  </View>
                </Pressable>
              </View>

              {/* SIGN UP CTA */}
              <Pressable 
                onPress={handleSignUp}
                className="bg-lingua-purple py-4 rounded-[20px] active:opacity-95 shadow-md items-center justify-center"
                style={{ height: 58 }}
              >
                <Text className="text-white font-poppins-bold text-[18px]">
                  Sign Up
                </Text>
              </Pressable>

            </View>

            {/* DIVIDER */}
            <View className="flex-row items-center justify-center my-6 gap-3">
              <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
              <Text className="text-[13px] font-poppins text-text-secondary">
                or continue with
              </Text>
              <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
            </View>

            {/* SOCIAL AUTH CARDS */}
            <View className="w-full">
              
              {/* GOOGLE CARD */}
              <Pressable 
                onPress={handleSignUp}
                className="bg-white border-2 border-border-primary rounded-[20px] py-3.5 px-6 flex-row items-center justify-center mb-3 active:bg-slate-50"
              >
                {/* Stylized high-fidelity G logo */}
                <View className="w-6 h-6 mr-3 flex-row flex-wrap items-center justify-center">
                  <Text className="text-[16px] font-poppins-bold text-[#EA4335]">G</Text>
                  <Text className="text-[16px] font-poppins-bold text-[#4285F4]">o</Text>
                  <Text className="text-[16px] font-poppins-bold text-[#FBBC05]">o</Text>
                  <Text className="text-[16px] font-poppins-bold text-[#34A853]">g</Text>
                </View>
                <Text className="text-[15px] font-poppins-semibold text-text-primary">
                  Continue with Google
                </Text>
              </Pressable>

              {/* FACEBOOK CARD */}
              <Pressable 
                onPress={handleSignUp}
                className="bg-white border-2 border-border-primary rounded-[20px] py-3.5 px-6 flex-row items-center justify-center mb-3 active:bg-slate-50"
              >
                {/* Visual FB blue circular icon */}
                <View className="w-6 h-6 bg-[#1877F2] rounded-full items-center justify-center mr-3">
                  <Text className="text-white font-poppins-bold text-xs">f</Text>
                </View>
                <Text className="text-[15px] font-poppins-semibold text-text-primary">
                  Continue with Facebook
                </Text>
              </Pressable>

              {/* APPLE CARD */}
              <Pressable 
                onPress={handleSignUp}
                className="bg-white border-2 border-border-primary rounded-[20px] py-3.5 px-6 flex-row items-center justify-center mb-6 active:bg-slate-50"
              >
                {/* Native Apple black emblem */}
                <View className="mr-3">
                  <Text className="text-text-primary text-[18px] font-poppins-bold"></Text>
                </View>
                <Text className="text-[15px] font-poppins-semibold text-text-primary">
                  Continue with Apple
                </Text>
              </Pressable>

            </View>

            {/* TOGGLE TO SIGN IN */}
            <View className="flex-row justify-center mt-auto pt-4">
              <Text className="text-sm font-poppins text-text-secondary">
                Already have an account?{" "}
              </Text>
              <Pressable onPress={() => router.replace("/sign-in")}>
                <Text className="text-sm font-poppins-bold text-lingua-purple">
                  Log in
                </Text>
              </Pressable>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* VERIFICATION DIALOG */}
      <VerificationModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#0D132B",
    paddingVertical: Platform.OS === "ios" ? 4 : 0,
    width: "100%",
  },
});
