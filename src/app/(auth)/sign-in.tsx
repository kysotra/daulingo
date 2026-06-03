import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { Image, Pressable, ScrollView, Text, View } from "@/tw";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TextInput as RNTextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOAuth } from "@clerk/expo";
import { useSignIn } from "@clerk/expo/legacy";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

// Warm up web browser for OAuth
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Clerk Social Logins
  const { startOAuthFlow: startGoogleAuth } = useOAuth({ strategy: "oauth_google" });
  const { startOAuthFlow: startFacebookAuth } = useOAuth({ strategy: "oauth_facebook" });
  const { startOAuthFlow: startAppleAuth } = useOAuth({ strategy: "oauth_apple" });

  const handleSocialAuth = async (startAuth: any) => {
    try {
      setLoading(true);
      const { createdSessionId, setActive: setSessionActive } = await startAuth({
        redirectUrl: Linking.createURL("/", { scheme: "duolingoclone" }),
      });

      if (createdSessionId && setSessionActive) {
        await setSessionActive({ session: createdSessionId });
      }
    } catch (err: any) {
      console.error("OAuth error: ", err);
      Alert.alert("Authentication Failed", err.errors?.[0]?.message || err.message || "Failed to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!isLoaded || loading) return;

    if (!email) {
      Alert.alert("Input Error", "Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const { supportedFirstFactors } = await signIn.create({ identifier: email });

      const emailCodeFactor = supportedFirstFactors?.find(
        (factor: any) => factor.strategy === "email_code"
      );

      if (emailCodeFactor && 'emailAddressId' in emailCodeFactor) {
        await signIn.prepareFirstFactor({
          strategy: "email_code",
          emailAddressId: emailCodeFactor.emailAddressId,
        });
        setModalVisible(true);
      } else {
        Alert.alert("Sign In Error", "Email verification code is not supported for this account.");
      }
    } catch (err: any) {
      console.error("SignIn error: ", err);
      Alert.alert("Sign In Failed", err.errors?.[0]?.message || err.message || "Failed to start sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded || !signIn) return;
    const result = await signIn.attemptFirstFactor({
      strategy: "email_code",
      code,
    });

    if (result.status === "complete") {
      if (setActive) {
        await setActive({ session: result.createdSessionId });
      }
    } else {
      throw new Error(`Sign in state: ${result.status}`);
    }
  };

  const handleResend = async () => {
    if (!isLoaded || !signIn) return;
    const { supportedFirstFactors } = signIn;
    const emailCodeFactor = supportedFirstFactors?.find(
      (factor: any) => factor.strategy === "email_code"
    );
    if (emailCodeFactor && 'emailAddressId' in emailCodeFactor) {
      await signIn.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId: emailCodeFactor.emailAddressId,
      });
    }
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
                <Ionicons name="chevron-back" size={20} color="#0D132B" />
              </Pressable>
            </View>

            {/* HERO TYPOGRAPHY */}
            <View className="mt-5 mb-4">
              <Text className="text-3xl font-poppins-bold text-text-primary tracking-tight">
                Welcome back
              </Text>
              <Text className="text-[15px] font-poppins text-text-secondary mt-1.5">
                Log in to continue your journey ✨
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
              <View className="bg-white border-2 border-border-primary rounded-[20px] px-5 py-3 mb-6 focus-within:border-lingua-purple shadow-sm">
                <Text className="text-xs font-poppins-semibold text-text-secondary mb-1">
                  Email
                </Text>
                <RNTextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.textInput}
                  placeholder="Enter email address"
                  placeholderTextColor="#6B7280"
                />
              </View>

              {/* LOG IN CTA */}
              <Pressable 
                onPress={handleSignIn}
                disabled={loading}
                className={`bg-lingua-purple py-4 rounded-[20px] active:opacity-95 shadow-md items-center justify-center ${loading ? "opacity-75" : ""}`}
                style={{ height: 58 }}
              >
                {loading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text className="text-white font-poppins-bold text-[18px]">
                    Log In
                  </Text>
                )}
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
                onPress={() => handleSocialAuth(startGoogleAuth)}
                disabled={loading}
                className="bg-white border-2 border-border-primary rounded-[20px] py-3.5 px-6 flex-row items-center justify-center mb-3 active:bg-slate-50"
              >
                <AntDesign name="google" size={20} color="#EA4335" style={{ marginRight: 10 }} />
                <Text className="text-[15px] font-poppins-semibold text-text-primary">
                  Continue with Google
                </Text>
              </Pressable>
              
              {/* FACEBOOK CARD */}
              <Pressable
                onPress={() => handleSocialAuth(startFacebookAuth)}
                disabled={loading}
                className="bg-white border-2 border-border-primary rounded-[20px] py-3.5 px-6 flex-row items-center justify-center mb-3 active:bg-slate-50"
              >
                <FontAwesome name="facebook" size={20} color="#1877F2" style={{ marginRight: 10, marginBottom: 10 }} />
                <Text className="text-[15px] font-poppins-semibold text-text-primary">
                  Continue with Facebook
                </Text>
              </Pressable>

              {/* APPLE CARD */}
              <Pressable
                onPress={() => handleSocialAuth(startAppleAuth)}
                disabled={loading}
                className="bg-white border-2 border-border-primary rounded-[20px] py-3.5 px-6 flex-row items-center justify-center mb-6 active:bg-slate-50"
              >
                <AntDesign name="apple" size={20} color="#000000" style={{ marginRight: 10, marginBottom:10}} />
                <Text className="text-[15px] font-poppins-semibold text-text-primary">
                  Continue with Apple
                </Text>
              </Pressable>

            </View>

            {/* TOGGLE TO SIGN UP */}
            <View className="flex-row justify-center mt-auto pt-4">
              <Text className="text-sm font-poppins text-text-secondary">
                {"Don't have an account? "}
              </Text>
              <Pressable onPress={() => router.replace("/sign-up")}>
                <Text className="text-sm font-poppins-bold text-lingua-purple">
                  Sign up
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
        onVerify={handleVerify}
        onResend={handleResend}
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
