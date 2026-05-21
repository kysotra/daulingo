import React from "react";
import {
    Pressable as RNPressable,
    ScrollView as RNScrollView,
    Text as RNText,
    TextInput as RNTextInput,
    TouchableHighlight as RNTouchableHighlight,
    View as RNView,
    StyleSheet,
} from "react-native";
import { useCssElement } from "react-native-css";

const useCss = useCssElement as any;

export type ViewProps = React.ComponentProps<typeof RNView> & {
  className?: string;
};

export const View = (props: ViewProps) => {
  return useCss(RNView, props as any, { className: "style" });
};
View.displayName = "CSS(View)";

export type TextProps = React.ComponentProps<typeof RNText> & {
  className?: string;
};

export const Text = (props: TextProps) => {
  return useCss(RNText, props as any, { className: "style" });
};
Text.displayName = "CSS(Text)";

export type ScrollViewProps = React.ComponentProps<typeof RNScrollView> & {
  className?: string;
  contentContainerClassName?: string;
};

export const ScrollView = (props: ScrollViewProps) => {
  const useCss = useCssElement as any;

  return useCss(RNScrollView, props as any, {
    className: "style",
    contentContainerClassName: "contentContainerStyle",
  }) as React.ReactElement;
};
ScrollView.displayName = "CSS(ScrollView)";

export type PressableProps = React.ComponentProps<typeof RNPressable> & {
  className?: string;
};

export const Pressable = (props: PressableProps) => {
  return useCss(RNPressable, props as any, { className: "style" });
};
Pressable.displayName = "CSS(Pressable)";

export type TextInputProps = React.ComponentProps<typeof RNTextInput> & {
  className?: string;
};

export const TextInput = (props: TextInputProps) => {
  return useCss(RNTextInput, props as any, { className: "style" });
};
TextInput.displayName = "CSS(TextInput)";

function WrappedTouchableHighlight(
  props: React.ComponentProps<typeof RNTouchableHighlight>
) {
  const flattened = StyleSheet.flatten(props.style) as
    | ({ underlayColor?: string } & Record<string, unknown>)
    | undefined;
  const { underlayColor, ...style } = flattened || {};

  return (
    <RNTouchableHighlight
      underlayColor={underlayColor}
      {...props}
      style={style}
    />
  );
}

export type TouchableHighlightProps = React.ComponentProps<
  typeof RNTouchableHighlight
> & {
  className?: string;
};

export const TouchableHighlight = (props: TouchableHighlightProps) => {
  return useCss(WrappedTouchableHighlight, props as any, {
    className: "style",
  });
};
TouchableHighlight.displayName = "CSS(TouchableHighlight)";

export { Image } from "./image";

