import React from "react";
import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends PressableProps {
  children: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  icon?: React.ReactNode;
  className?: string;
  textClassName?: string;
  spinnerColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  loadingText,
  icon,
  disabled,
  className = "",
  textClassName = "",
  spinnerColor = "#1e5975",
  ...props
}) => {
  const baseStyle =
    "bg-background1 w-full rounded-3xl py-4 px-6 flex-row items-center justify-center gap-2 active:opacity-70";

  const baseTextStyle = "text-background font-semibold text-lg font-button";

  return (
    <Pressable
      className={twMerge(baseStyle, className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <ActivityIndicator color={spinnerColor} />
          <Text className={twMerge(baseTextStyle, textClassName)}>
            {loadingText}
          </Text>
        </>
      ) : (
        <>
          <Text className={twMerge(baseTextStyle, textClassName)}>
            {children}
          </Text>
          {icon}
        </>
      )}
    </Pressable>
  );
};

export default Button;