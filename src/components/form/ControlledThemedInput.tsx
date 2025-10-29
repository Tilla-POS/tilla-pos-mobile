import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {ThemedInput} from '../ui/ThemedInput';
import {TextInputProps} from 'react-native';

interface ControlledThemedInputProps<T extends FieldValues>
  extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export function ControlledThemedInput<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: ControlledThemedInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <ThemedInput
          label={label}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
          {...props}
        />
      )}
    />
  );
}
