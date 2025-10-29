import React from 'react';
import {Control, Controller, FieldValues, Path} from 'react-hook-form';
import {ThemedSelect} from '../ui/ThemedSelect';

interface Option {
  label: string;
  value: string;
}

interface ControlledThemedSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  options: Option[];
}

export function ControlledThemedSelect<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  options,
}: ControlledThemedSelectProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <ThemedSelect
          label={label}
          placeholder={placeholder}
          value={value}
          onValueChange={onChange}
          options={options}
          error={error?.message}
        />
      )}
    />
  );
}
