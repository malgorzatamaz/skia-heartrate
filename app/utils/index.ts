import { useEffect } from "react";
import { Easing, cancelAnimation, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";


export const useLoop = ({ duration }: { duration: number }) => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    return () => {
      cancelAnimation(progress);
    };
  }, [duration, progress]);
  return progress;
};

export const beatEasing = (x: number): number => {
  "worklet";
  const c4 = (2 * Math.PI) / 3;
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return -Math.pow(2, 8 * x - 8) * Math.sin((x * 8 - 8.75) * c4);
};
