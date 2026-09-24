import React, { useState } from "react";
import { View, Text, TextInput, Pressable, TextInputProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { twMerge } from "tailwind-merge";
import { Control, Controller, FieldError, Merge, FieldErrorsImpl, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> extends Omit<TextInputProps, "onChangeText" | "value"> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
  icon?: React.ReactNode;
  labelRight?: React.ReactNode;
  small?: string;
  className?: string;
  labelClassName?: string;
  smallClassName?: string;
}

 function InputField<T extends FieldValues>({
  label,
  name,
  control,
  error,
  small,
  icon,
  labelRight,
  className,
  labelClassName,
  smallClassName,
  secureTextEntry,
  ...props
}: InputFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = !!secureTextEntry;

  return (
    <View className={className}>
      <View className="flex-row items-center justify-between p-2">
        <Text className={twMerge("text-text3 text-sm font-light font-body", labelClassName)}>
          {label}
        </Text>
        {small ? (
          <Text className={twMerge("text-xs", smallClassName)}>{small}</Text>
        ) : null}
        {labelRight ? labelRight : null}
      </View>

      <View className="flex-row items-center relative">
        {icon ? icon : null}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              secureTextEntry={isPasswordType && !showPassword}
              className="bg-white w-[98%]  rounded-3xl p-4 text-xs  focus:outline-none font-bold mx-auto placeholder:text-text1"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value ?? ""}
              {...props}
            />
          )}
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
        <Text className="text-red-500 w-[90%] mx-auto mt-1 font-body text-xs">{String(error.message)}</Text>
      ) : null}
    </View>
  );
}

export default InputField