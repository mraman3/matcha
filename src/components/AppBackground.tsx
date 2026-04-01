import { ReactNode } from "react";
import { ImageBackground, View, Platform } from "react-native";

const appBackground = require("../../assets/images/entry-bg.jpg");

type Props = {
  children: ReactNode;
};

export default function AppBackground({ children }: Props) {
  return (
    <View
      style={{
        flex: 1,
        minHeight: "100%",
      }}
    >
      <ImageBackground
        source={appBackground}
        resizeMode="cover"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        imageStyle={{
          width: "100%",
          height: "100%",
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(247, 242, 232, 0.10)",
        }}
      >
        {children}
      </View>
    </View>
  );
}