import React from 'react';
import {TextInput, TextInputProps, StyleSheet, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

interface ThemedInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const ThemedInput: React.FC<ThemedInputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const {theme, spacing, radius, typography} = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText variant="label" color="secondary" style={styles.label}>
          {label}
        </ThemedText>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.input.background,
            borderColor: error ? theme.border.error : theme.input.border,
            borderRadius: radius.sm,
            color: theme.input.text,
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[3],
            fontSize: typography.fontSize.base,
          },
          style,
        ]}
        placeholderTextColor={theme.input.placeholder}
        {...props}
      />
      {error && (
        <ThemedText
          variant="caption"
          style={[styles.error, {color: theme.error.main}]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
  },
  error: {
    marginTop: 4,
  },
});
