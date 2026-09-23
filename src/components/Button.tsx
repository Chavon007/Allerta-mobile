import React from "react";
import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";

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
  return (
    <Pressable className="" disabled={isLoading || disabled} {...props}>
      {isLoading ? (
        <>
          <ActivityIndicator />
          <Text>{loadingText}</Text>
        </>
      ) : (
        <>
          {icon}
          <Text>{children}</Text>
        </>
      )}
    </Pressable>
  );
};

export default Button;
