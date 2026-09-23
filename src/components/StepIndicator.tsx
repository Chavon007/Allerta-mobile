import { View } from "react-native";
import { twMerge } from "tailwind-merge";

interface StepIndicatorProps {
  currentStep: number;
  totalStep: number;
}

const StepIndicator = ({ currentStep, totalStep }: StepIndicatorProps) => {
  return (
    <View className="flex-row items-center mt-2 gap-2">
      {Array.from({ length: totalStep }).map((_, index) => {
        const isActive = index === currentStep - 1;
        return (
          <View
            key={index}
            className={twMerge(
              "h-2 rounded-full",
              isActive ? "w-6 bg-background" : "w-2 bg-text1/30"
            )}
          />
        );
      })}
    </View>
  );
};

export default StepIndicator;