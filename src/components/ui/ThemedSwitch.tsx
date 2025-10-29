import React from 'react';
import {View, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

interface ThemedSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  error?: string;
  labelPosition?: 'left' | 'right';
  style?: any;
}

export const ThemedSwitch: React.FC<ThemedSwitchProps> = ({
  value,
  onValueChange,
  label,
  disabled = false,
  error,
  labelPosition = 'left',
  style,
}) => {
  const {theme, spacing} = useTheme();

  const switchElement = (
    <Switch
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      trackColor={{
        false: theme.border.primary,
        true: theme.primary.main,
      }}
      thumbColor={value ? theme.primary.contrast : theme.background.primary}
      ios_backgroundColor={theme.border.primary}
    />
  );

  const labelElement = label ? (
    <ThemedText
      variant="body"
      color={disabled ? 'disabled' : 'primary'}
      style={[
        styles.label,
        labelPosition === 'left' ? {marginRight: spacing[3]} : {marginLeft: spacing[3]},
      ]}>
      {label}
    </ThemedText>
  ) : null;

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.switchContainer}
        onPress={() => !disabled && onValueChange(!value)}
        disabled={disabled}
        activeOpacity={0.7}>
        {labelPosition === 'left' && labelElement}
        {switchElement}
        {labelPosition === 'right' && labelElement}
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    flex: 1,
  },
  error: {},
});
