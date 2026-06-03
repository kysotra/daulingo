import React, { useEffect } from 'react';
import { View, Text, Pressable, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface TabItemProps {
  route: any;
  isFocused: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

function TabItem({
  route,
  isFocused,
  onPress,
  onLongPress,
}: TabItemProps) {
  const getTabDetails = (name: string) => {
    switch (name) {
      case 'index':
        return { icon: 'home' as const, label: 'Home' };
      case 'learn':
        return { icon: 'book' as const, label: 'Learn' };
      case 'ai-teacher':
        return { icon: 'videocam' as const, label: 'Teacher' };
      case 'chat':
        return { icon: 'chatbubbles' as const, label: 'Chat' };
      case 'profile':
        return { icon: 'person' as const, label: 'Profile' };
      default:
        return { icon: 'help-circle' as const, label: 'Tab' };
    }
  };

  const { icon, label } = getTabDetails(route.name);

  // Smooth vertical translation for icon centering
  const animatedIconStyle = useAnimatedStyle(() => {
    const translateY = withTiming(isFocused ? 0 : -6, { duration: 180 });
    return {
      transform: [{ translateY }],
    };
  });

  // Smooth opacity and scale transition for label reveal/hide
  const animatedLabelStyle = useAnimatedStyle(() => {
    const opacity = withTiming(isFocused ? 0 : 1, { duration: 180 });
    const translateY = withTiming(isFocused ? 10 : 0, { duration: 180 });
    const scale = withTiming(isFocused ? 0.8 : 1, { duration: 180 });
    return {
      opacity,
      transform: [{ translateY }, { scale }],
    };
  });

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 64,
        zIndex: 10,
      }}
    >
      <Animated.View style={animatedIconStyle}>
        <Ionicons
          name={isFocused ? icon : (`${icon}-outline` as any)}
          size={24}
          color={isFocused ? '#FFFFFF' : '#6B7280'}
        />
      </Animated.View>
      <Animated.View style={[{ position: 'absolute', bottom: 6 }, animatedLabelStyle]}>
        <Text
          style={{
            fontFamily: isFocused ? 'Poppins-Bold' : 'Poppins-Medium',
            fontSize: 10,
            color: '#6B7280',
          }}
        >
          {label}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const totalRoutes = state.routes.length;
  const tabWidth = width / totalRoutes;
  const circleWidth = 52;
  const leftOffset = (tabWidth - circleWidth) / 2;

  const activeIndex = state.index;
  const translateX = useSharedValue(activeIndex * tabWidth + leftOffset);

  useEffect(() => {
    translateX.value = withTiming(activeIndex * tabWidth + leftOffset, {
      duration: 200,
      easing: Easing.linear,
    });
  }, [activeIndex, tabWidth, leftOffset, translateX]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderTopWidth: 2,
        borderTopColor: '#E5E7EB',
        paddingBottom: Math.max(insets.bottom, 10),
        paddingTop: 6,
        position: 'relative',
        height: 64 + Math.max(insets.bottom, 10) + 6,
      }}
    >
      {/* Moving Active Circle Indicator */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 12,
            width: circleWidth,
            height: circleWidth,
            borderRadius: circleWidth / 2,
            backgroundColor: '#6C4EF5', // primary brand purple
            zIndex: 1,
            // 3D bottom border highlight matching the app brand system
            borderBottomWidth: 3,
            borderBottomColor: '#5B3BF6',
          },
          animatedCircleStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
}
