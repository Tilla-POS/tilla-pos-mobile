import React from 'react';
import {Text, TextProps} from 'react-native';
import {useTheme} from '../../hooks/useTheme';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  color?:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'disabled'
    | 'inverse'
    | 'link';
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  variant = 'body',
  color = 'primary',
  weight = 'regular',
  style,
  ...props
}) => {
  const {theme, typography} = useTheme();

  const variantStyles = {
    h1: {
      fontSize: typography.fontSize['4xl'],
      lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
      fontWeight: typography.fontWeight.bold,
    },
    h2: {
      fontSize: typography.fontSize['3xl'],
      lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
      fontWeight: typography.fontWeight.bold,
    },
    h3: {
      fontSize: typography.fontSize['2xl'],
      lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
      fontWeight: typography.fontWeight.semiBold,
    },
    h4: {
      fontSize: typography.fontSize.xl,
      lineHeight: typography.fontSize.xl * typography.lineHeight.normal,
      fontWeight: typography.fontWeight.semiBold,
    },
    body: {
      fontSize: typography.fontSize.base,
      lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    },
    caption: {
      fontSize: typography.fontSize.sm,
      lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    },
    label: {
      fontSize: typography.fontSize.xs,
      lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
      fontWeight: typography.fontWeight.medium,
    },
  };

  const weightStyles = {
    regular: {fontWeight: typography.fontWeight.regular},
    medium: {fontWeight: typography.fontWeight.medium},
    semiBold: {fontWeight: typography.fontWeight.semiBold},
    bold: {fontWeight: typography.fontWeight.bold},
  };

  return (
    <Text
      style={[
        variantStyles[variant],
        weightStyles[weight],
        {color: theme.text[color]},
        style,
      ]}
      {...props}
    />
  );
};
