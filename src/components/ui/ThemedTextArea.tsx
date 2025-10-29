import React from 'react';
import {TextInput, TextInputProps, StyleSheet, View} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

interface ThemedTextAreaProps extends TextInputProps {
  label?: string;
  error?: string;
  minHeight?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export const ThemedTextArea: React.FC<ThemedTextAreaProps> = ({
  label,
  error,
  minHeight = 100,
  maxLength,
  showCharacterCount = false,
  style,
  value,
  ...props
}) => {
  const {theme, spacing, radius, typography} = useTheme();
  const characterCount = value?.toString().length || 0;

  return (
    <View style={styles.container}>
      {label && (
        <ThemedText
          variant="label"
          color="secondary"
          style={[styles.label, {marginBottom: spacing[2]}]}>
          {label}
        </ThemedText>
      )}
      <TextInput
        style={[
          styles.textArea,
          {
            backgroundColor: theme.input.background,
            borderColor: error ? theme.border.error : theme.input.border,
            borderRadius: radius.sm,
            color: theme.input.text,
            paddingHorizontal: spacing[4],
            paddingVertical: spacing[3],
            fontSize: typography.fontSize.base,
            minHeight,
          },
          style,
        ]}
        placeholderTextColor={theme.input.placeholder}
        multiline
        textAlignVertical="top"
        value={value}
        maxLength={maxLength}
        {...props}
      />
      <View style={styles.footer}>
        {error && (
          <ThemedText
            variant="caption"
            style={[styles.error, {color: theme.error.main, marginTop: spacing[1]}]}>
            {error}
          </ThemedText>
        )}
        {showCharacterCount && maxLength && (
          <ThemedText
            variant="caption"
            color="secondary"
            style={[
              styles.characterCount,
              {marginTop: spacing[1]},
              error && {marginLeft: spacing[2]},
            ]}>
            {characterCount}/{maxLength}
          </ThemedText>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {},
  textArea: {
    borderWidth: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  error: {
    flex: 1,
  },
  characterCount: {
    textAlign: 'right',
  },
});
