import React, { useState } from "react";
import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";

import {
  UseFormRegisterReturn,
  FieldError,
  Merge,
  FieldErrorsImpl,
} from "react-hook-form";

interface InputFieldProps extends TextInputProps {
  label?: string;
  registration: Partial<UseFormRegisterReturn>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  icon?: React.ReactNode;
  labelRight?: React.ReactNode;
  small?: string;
  className?: string;
  labelClassName?: string;
  smallClassName?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  registration,
  error,
  small,
  icon,
  labelRight,
  className,
  labelClassName,
  smallClassName,
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = !!secureTextEntry;

  return (
    <View className={className}>
      <View className="flex-row items-center justify-between p-2">
        <Text
          className={twMerge(
            "text-black/90 text-sm font-light",
            labelClassName
          )}
        >
          {label}
        </Text>
        {small ? (
          <Text className={twMerge("text-xs", smallClassName)}>{small}</Text>
        ) : null}
        {labelRight ? labelRight : null}
      </View>

      <View className="flex-row items-center relative">
        {icon ? icon : null}
        <TextInput
          secureTextEntry={isPasswordType && !showPassword}
          className="bg-transparent border border-black rounded-xl text-xs text-black/80 font-bold p-3 w-full"
          onChangeText={(text) =>
            registration.onChange?.({ target: { value: text } } as any)
          }
          onBlur={registration.onBlur as any}
          {...props}
        />

        {isPasswordType ? (
          <Pressable
            className="absolute right-2"
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={18}
              color="#404a54"
            />
          </Pressable>
        ) : null}
      </View>

      {error?.message ? (
        <Text className="text-red-500 text-xs">{String(error.message)}</Text>
      ) : null}
    </View>
  );
};