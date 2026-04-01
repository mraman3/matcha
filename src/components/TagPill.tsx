import { View, Text } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  label: string;
};

export default function TagPill({ label }: Props) {
  return (
    <View
      style={{
        backgroundColor: "#F1ECE2",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text style={{ fontSize: 12, color: colors.textSecondary }}>{label}</Text>
    </View>
  );
}