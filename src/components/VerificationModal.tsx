import React, { useState, useEffect, useRef } from "react";
import { 
  Modal, 
  KeyboardAvoidingView, 
  TextInput as RNTextInput, 
  Platform, 
  StyleSheet, 
  Pressable as RNPressable,
} from "react-native";
import { useRouter } from "expo-router";
import { View, Text, Pressable } from "@/tw";

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function VerificationModal({ visible, onClose }: VerificationModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const inputRef = useRef<RNTextInput>(null);

  // Auto-focus hidden input on modal open
  useEffect(() => {
    if (visible) {
      setCode("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  // Handle auto-navigation on last digit
  useEffect(() => {
    if (code.length === 6) {
      const timer = setTimeout(() => {
        onClose();
        router.replace("/");
      }, 300); // Slight delay for satisfying visual feedback
      return () => clearTimeout(timer);
    }
  }, [code, router, onClose]);

  const handleBoxPress = () => {
    inputRef.current?.focus();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Semi-transparent backdrop */}
      <RNPressable 
        style={styles.backdrop} 
        onPress={onClose}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          {/* Modal Card */}
          <RNPressable 
            style={styles.cardContainer}
            onPress={(e) => e.stopPropagation()} // Prevent closing when tapping card
          >
            {/* Visual Header / Indicator */}
            <View className="w-12 h-1.5 bg-[#E5E7EB] rounded-full self-center mb-6" />

            {/* Email Icon / Accent */}
            <View className="w-16 h-16 bg-[#F0EDFF] rounded-full items-center justify-center self-center mb-5 border border-[#DDD6FF]">
              {/* Styled Vector Envelope */}
              <View className="w-8 h-5.5 border-2 border-lingua-purple rounded-md justify-center items-center relative">
                <View className="absolute top-0 w-5 h-3 border-b-2 border-r-2 border-lingua-purple rotate-45 self-center top-[-1px]" />
              </View>
            </View>

            {/* Typography */}
            <Text className="text-2xl font-poppins-bold text-text-primary text-center mb-2">
              Verify your email
            </Text>
            <Text className="text-[14px] font-poppins text-text-secondary text-center leading-relaxed mb-8 px-4">
              We sent a 6-digit verification code to your inbox. Please enter it below to complete your sign up.
            </Text>

            {/* Hidden native input for state handling */}
            <RNTextInput
              ref={inputRef}
              value={code}
              onChangeText={(text) => {
                // Keep only numeric characters
                const sanitized = text.replace(/[^0-9]/g, "");
                if (sanitized.length <= 6) {
                  setCode(sanitized);
                }
              }}
              keyboardType="number-pad"
              maxLength={6}
              caretHidden={true}
              style={styles.hiddenInput}
            />

            {/* Visible Code Input Box Overlay */}
            <Pressable 
              onPress={handleBoxPress}
              className="flex-row justify-between w-full px-2 mb-6"
            >
              {Array.from({ length: 6 }).map((_, index) => {
                const char = code[index] || "";
                const isFocused = code.length === index;

                return (
                  <View
                    key={index}
                    className={`w-11 h-14 border-2 rounded-2xl items-center justify-center bg-surface transition-all ${
                      isFocused 
                        ? "border-lingua-purple bg-white shadow-sm shadow-purple-200" 
                        : "border-border-primary"
                    }`}
                  >
                    <Text className="text-[20px] font-poppins-bold text-text-primary">
                      {char}
                    </Text>
                    {isFocused && (
                      <View className="absolute bottom-2.5 w-4 h-0.5 bg-lingua-purple rounded-full" />
                    )}
                  </View>
                );
              })}
            </Pressable>

            {/* Footer helper */}
            <Text className="text-xs font-poppins-medium text-text-secondary text-center mb-2">
              {"Didn't receive a code? "}<Text className="text-lingua-purple">Resend code</Text>
            </Text>

          </RNPressable>
        </KeyboardAvoidingView>
      </RNPressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(13, 19, 43, 0.4)", // Sleek dark overlay
    justifyContent: "flex-end",
  },
  keyboardView: {
    width: "100%",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 28,
    paddingTop: 16,
    paddingBottom: Platform.OS === "ios" ? 44 : 32,
    width: "100%",
    shadowColor: "#0D132B",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 20,
  },
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
  },
});
