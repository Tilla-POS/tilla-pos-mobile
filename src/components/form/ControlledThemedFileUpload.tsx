import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {View, StyleSheet} from 'react-native';
import {ThemedFileUpload, UploadedFile} from '../ui/ThemedFileUpload';
import {ThemedText} from '../ui/ThemedText';
import {useTheme} from '../../hooks/useTheme';

interface ControlledThemedFileUploadProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
  multiple?: boolean;
  maxSizeInMB?: number;
  accept?: 'image' | 'all';
  showPreview?: boolean;
  placeholder?: string;
  variant?: 'default' | 'compact' | 'avatar';
  size?: 'sm' | 'md' | 'lg';
}

export function ControlledThemedFileUpload<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
  multiple = false,
  maxSizeInMB = 10,
  accept = 'image',
  showPreview = true,
  placeholder = 'Upload file',
  variant = 'default',
  size = 'md',
}: ControlledThemedFileUploadProps<T>) {
  const {theme, spacing} = useTheme();

  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <View style={styles.container}>
          {label && variant !== 'avatar' && (
            <ThemedText
              variant="label"
              color="primary"
              style={{marginBottom: spacing[2]}}>
              {label}
            </ThemedText>
          )}
          <ThemedFileUpload
            value={value as UploadedFile | null}
            onFileSelect={(file: UploadedFile | null) => onChange(file)}
            onError={errorMessage => {
              // Error is already shown in alert by ThemedFileUpload
              console.error('File upload error:', errorMessage);
            }}
            disabled={disabled}
            multiple={multiple}
            maxSizeInMB={maxSizeInMB}
            accept={accept}
            showPreview={showPreview}
            placeholder={placeholder}
            variant={variant}
            size={size}
          />
          {error?.message && (
            <ThemedText
              variant="caption"
              style={[styles.errorText, {color: theme.error.main}]}>
              {error.message}
            </ThemedText>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  errorText: {
    marginTop: 4,
  },
});
