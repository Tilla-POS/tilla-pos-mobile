import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

interface ThemedCheckBoxProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  style?: any;
}

export const ThemedCheckBox: React.FC<ThemedCheckBoxProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  error,
  style,
}) => {
  const {theme, spacing} = useTheme();

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => !disabled && onValueChange(!value)}
        disabled={disabled}
        activeOpacity={0.7}>
        <CheckBox
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          tintColors={{
            true: theme.primary.main,
            false: error ? theme.border.error : theme.border.primary,
          }}
          onCheckColor={theme.primary.contrast}
          onFillColor={theme.primary.main}
          onTintColor={theme.primary.main}
          tintColor={error ? theme.border.error : theme.border.primary}
          style={styles.checkbox}
        />
        {label && (
          <ThemedText
            variant="body"
            color={disabled ? 'disabled' : 'primary'}
            style={[styles.label, {marginLeft: spacing[2]}]}>
            {label}
          </ThemedText>
        )}
      </TouchableOpacity>
      {error && (
        <ThemedText
          variant="caption"
          style={[styles.error, {color: theme.error.main, marginTop: spacing[1]}]}>
          {error}
        </ThemedText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  label: {
    flex: 1,
  },
  error: {
    marginLeft: 28,
  },
});
