import { View, Text } from "react-native";
import { colors } from "../theme/theme";

export default function OrnamentalDivider() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 14,
      }}
    >
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: colors.border,
        }}
      />
      <Text
        style={{
          marginHorizontal: 10,
          color: colors.textSecondary,
          fontSize: 12,
        }}
      >
        ❦
      </Text>
      <View
        style={{
          flex: 1,
          height: 1,
          backgroundColor: colors.border,
        }}
      />
    </View>
  );
}