import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedViewProps extends ViewProps {
  background?: 'primary' | 'secondary' | 'tertiary' | 'elevated';
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  background = 'primary',
  style,
  ...props
}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[{backgroundColor: theme.background[background]}, style]}
      {...props}
    />
  );
};
