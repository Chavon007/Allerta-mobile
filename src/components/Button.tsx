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
}

const Button: React.FC<ButtonProps> = ({
  children,
  isLoading,
  loadingText,
  icon,
  disabled,
  className = "",
  ...props
}) => {
  const baseStyle =
    "bg-background1 w-full rounded-3xl py-4 px-6 flex-row items-center justify-center gap-2 active:opacity-70";

  return (
    <Pressable
      className={twMerge(baseStyle, className)}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <>
          <ActivityIndicator color="#1e5975" />
          <Text className="text-background font-semibold text-lg font-button">
            {loadingText}
          </Text>
        </>
      ) : (
        <>
          <Text className="text-background font-semibold text-lg font-button">
            {children}
          </Text>
          {icon}
        </>
      )}
    </Pressable>
  );
};

export default Button;