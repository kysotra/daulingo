import React, { useState, useEffect, useRef } from "react";
import { 
  Modal, 
  KeyboardAvoidingView, 
  TextInput as RNTextInput, 
  Platform, 
  StyleSheet, 
  Pressable as RNPressable,
  ActivityIndicator,
} from "react-native";
import { View, Text, Pressable } from "@/tw";

interface VerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (code: string) => Promise<void>;
  onResend?: () => Promise<void>;
}

export default function VerificationModal({ visible, onClose, onVerify, onResend }: VerificationModalProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const inputRef = useRef<RNTextInput>(null);

  // Auto-focus hidden input on modal open
  useEffect(() => {
    if (visible) {
      setCode("");
      setErrorText(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  // Handle auto-navigation on last digit
  useEffect(() => {
    if (code.length === 6) {
      const verifyCode = async () => {
        setLoading(true);
        setErrorText(null);
        try {
          await onVerify(code);
          onClose();
        } catch (err: any) {
          setErrorText(err.errors?.[0]?.message || err.message || "Invalid verification code");
          setCode(""); // Clear the code on error for another attempt
        } finally {
          setLoading(false);
        }
      };
      verifyCode();
    }
  }, [code, onVerify, onClose]);

  const handleResend = async () => {
    if (!onResend || resending || loading) return;
    setResending(true);
    setErrorText(null);
    try {
      await onResend();
      setErrorText("A new verification code has been sent!");
    } catch (err: any) {
      setErrorText(err.errors?.[0]?.message || err.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
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
              {loading ? (
                <ActivityIndicator color="#6C4EF5" size="small" />
              ) : (
                <View className="w-8 h-5.5 border-2 border-lingua-purple rounded-md justify-center items-center relative">
                  <View className="absolute top-0 w-5 h-3 border-b-2 border-r-2 border-lingua-purple rotate-45 self-center top-[-1px]" />
                </View>
              )}
            </View>

            {/* Typography */}
            <Text className="text-2xl font-poppins-bold text-text-primary text-center mb-2">
              Verify your email
            </Text>
            <Text className="text-[14px] font-poppins text-text-secondary text-center leading-relaxed mb-6 px-4">
              We sent a 6-digit verification code to your inbox. Please enter it below to complete authentication.
            </Text>

            {/* Error / Status Text */}
            {errorText && (
              <Text 
                className={`text-xs font-poppins text-center mb-4 px-4 ${
                  errorText.includes("sent") ? "text-success font-poppins-semibold" : "text-error"
                }`}
              >
                {errorText}
              </Text>
            )}

            {/* Code Input Container */}
            <View style={{ width: "100%", height: 56, position: "relative", marginBottom: 24 }}>
              {/* Visible Code Input Box Overlay (purely visual, touches pass through to TextInput) */}
              <View 
                pointerEvents="none"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 8,
                }}
              >
                {Array.from({ length: 6 }).map((_, index) => {
                  const char = code[index] || "";
                  const isFocused = code.length === index && !loading;

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
              </View>

              {/* Hidden native input for state handling (rendered on top of visual boxes) */}
              <RNTextInput
                ref={inputRef}
                value={code}
                onChangeText={(text) => {
                  if (loading) return;
                  // Keep only numeric characters
                  const sanitized = text.replace(/[^0-9]/g, "");
                  if (sanitized.length <= 6) {
                    setCode(sanitized);
                  }
                }}
                keyboardType="number-pad"
                maxLength={6}
                caretHidden={true}
                style={styles.hiddenInputOverlay}
                editable={!loading}
                underlineColorAndroid="transparent"
              />
            </View>

            {/* Footer helper */}
            {onResend && (
              <View className="flex-row justify-center items-center mb-2">
                <Text className="text-xs font-poppins-medium text-text-secondary">
                  {"Didn't receive a code? "}
                </Text>
                <Pressable onPress={handleResend} disabled={resending || loading}>
                  <Text className="text-xs font-poppins-bold text-lingua-purple">
                    {resending ? "Sending..." : "Resend code"}
                  </Text>
                </Pressable>
              </View>
            )}

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
  hiddenInputOverlay: {
    ...StyleSheet.absoluteFillObject,
    color: "transparent",
    backgroundColor: "transparent",
    fontSize: 16,
    zIndex: 10,
  },
});
