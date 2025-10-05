import React from 'react';
import {View, ViewProps} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedCardProps extends ViewProps {
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const ThemedCard: React.FC<ThemedCardProps> = ({
  elevation = 'md',
  style,
  ...props
}) => {
  const {theme, radius, shadows, spacing} = useTheme();

  return (
    <View
      style={[
        {
          backgroundColor: theme.surface.primary,
          borderRadius: radius.xl,
          padding: spacing[4],
        },
        shadows[elevation],
        style,
      ]}
      {...props}
    />
  );
};
