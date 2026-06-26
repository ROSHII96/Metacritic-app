import { useState } from "react";
import { Text, View } from "react-native";

export function Score({ score, maxScore }) {
  // Fallback to a random score if it's null, undefined, or not a number
  const [displayScore] = useState(() => {
    if (score !== undefined && score !== null && !isNaN(score)) {
      return score;
    }
    return Math.floor(Math.random() * 101);
  });

  const getColor = () => {
    const percentage = (displayScore / maxScore) * 100;
    if (percentage < 40) return "bg-red-500";
    if (percentage < 60) return "bg-yellow-500";
    return "bg-green-500";
  };

  const className = getColor();

  return (
    <View
      className={`${className} h-8 w-8 items-center justify-center rounded-full`}
    >
      <Text className="text-lg font-bold text-white">{displayScore}</Text>
    </View>
  );
}
