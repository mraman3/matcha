import { ReactNode } from "react";
import { ImageBackground, View } from "react-native";

const appBackground = require("../../assets/images/entry-bg.jpg");

type Props = {
  children: ReactNode;
};

export default function AppBackground({ children }: Props) {
  return (
    <ImageBackground
      source={appBackground}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View
        style={{
          flex: 1,
        }}
      >
        {children}
      </View>
    </ImageBackground>
  );
}