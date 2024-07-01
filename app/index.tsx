import React from "react";
import { Canvas, Path, Group, Skia, fitbox, Blur, rect, center, mix } from "@shopify/react-native-skia";
import { Dimensions } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { beatEasing, useLoop } from "./utils";
 

const heart = Skia.Path.MakeFromSVGString(
  // "M 32 60 C -29.2 19.6 13.2 -12 31.2 4.4 C 31.6 4.8 31.6 5.2 32 5.2 A 12.4 12.4 90 0 1 32.8 4.4 C 50.8 -12 93.2 19.6 32 60 Z"
  "M29.144 20.773c-.063-.13-4.227-8.67-11.44-2.59C7.63 28.795 28.94 43.256 29.143 43.394c.204-.138 21.513-14.6 11.44-25.213-7.214-6.08-11.377 2.46-11.44 2.59z"
)!;

const App = () => {
  const heartRate = 120;
  const duration = 3600 * 60 / heartRate;
  const progress = useLoop({ duration: duration / 2 });

  const { width, height } = Dimensions.get("window");
  const src = heart.computeTightBounds();
  const pad = 64;
  const dst = rect(pad, pad, width - 2 * pad, height - pad * 2);
  const origin = { x: width / 2, y: height / 2 };
  const transform = useDerivedValue(() => [
    { scale: mix(beatEasing(1 - progress.value), 1.2, 1) },
  ]);
  const strokeWidth = useDerivedValue(() => mix(progress.value, 1.5, 1));

  return (
    <Canvas style={{ flex: 1 }}>
      <Group transform={transform} origin={origin}>
        <Group transform={fitbox("contain", src, dst)}>
          <Path
            color="#D52327"
            origin={center(src)}
            path={heart}
            transform={[{ scale: 1}]} 
            style="stroke"
            strokeWidth={strokeWidth}
            >
              <Blur blur={1} />
            </Path>
          <Path
            color="#D52327"
            path={heart}
            origin={center(src)}
          />
          

          <Path
            color="red"
            path={heart}
            transform={[{ scale: 0.7 }]} 
            origin={center(src)}
          >
            <Blur blur={1} />
          </Path>
          </Group>
      </Group>
    </Canvas>
  );
};
 
export default App;
