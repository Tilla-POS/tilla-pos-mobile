import React from 'react';
import {View, StyleSheet} from 'react-native';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {useTheme} from '../../hooks/useTheme';
import {ThemedText} from './ThemedText';

interface ThemedRadioButtonProps {
  options: Array<{
    id: string;
    label: string;
    value: string;
  }>;
  selectedId: string;
  onPress: (id: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
  layout?: 'row' | 'column';
  style?: any;
}

export const ThemedRadioButton: React.FC<ThemedRadioButtonProps> = ({
  options,
  selectedId,
  onPress,
  label,
  error,
  disabled = false,
  layout = 'column',
  style,
}) => {
  const {theme, spacing, typography} = useTheme();

  const radioButtons: RadioButtonProps[] = options.map(option => ({
    id: option.id,
    label: option.label,
    value: option.value,
    selected: selectedId === option.id,
    disabled,
    color: theme.primary.main,
    borderColor: error ? theme.border.error : theme.border.primary,
    labelStyle: {
      color: disabled ? theme.text.disabled : theme.text.primary,
      fontSize: typography.fontSize.base,
      fontFamily: typography.fontFamily.regular,
    },
    size: 20,
    containerStyle: {
      marginBottom: layout === 'column' ? spacing[2] : 0,
      marginRight: layout === 'row' ? spacing[4] : 0,
    },
  }));

  return (
    <View style={[styles.container, style]}>
      {label && (
        <ThemedText
          variant="label"
          color="secondary"
          style={[styles.label, {marginBottom: spacing[2]}]}>
          {label}
        </ThemedText>
      )}
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPress}
        layout={layout}
        containerStyle={styles.radioGroup}
      />
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
  label: {},
  radioGroup: {
    alignItems: 'flex-start',
  },
  error: {},
});
