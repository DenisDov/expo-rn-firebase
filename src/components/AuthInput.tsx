import { useTheme } from "@shopify/restyle";
import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { theme } from "@app/theme";

type Props = {
  onBlur: () => void;
  onChange: () => void;
  value: string;
  placeholder: string;
};

export const AuthInput = ({ onBlur, onChange, value, placeholder }: Props) => {
  const appTheme = useTheme();
  return (
    <TextInput
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
      // placeholderTextColor={appTheme.colors.inputPlaceholder}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      autoCorrect={false}
      style={[styles.input, { color: appTheme.colors.primaryText }]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: theme.spacing.xs,
    fontSize: 18,
    fontFamily: "Raleway-Regular",
    height: theme.spacing.xl,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.primary,
  },
});
