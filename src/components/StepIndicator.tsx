
import { View } from "react-native";

interface StepIndicatorProps {
  currentStep: number;
  totalStep: number;
}

const StepIndicator = ({ currentStep, totalStep }: StepIndicatorProps) => {
  return (
    <View>
      {Array.from({ length: totalStep }).map((_, index) => {
        const isActive = index === currentStep - 1;
        return <View key={index} className={isActive ? "" : ""} />;
      })}
    </View>
  );
};

export default StepIndicator;
