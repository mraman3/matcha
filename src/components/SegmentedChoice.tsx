import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  value: boolean | null;
  onChange: (value: boolean) => void;
};

export default function SegmentedChoice({ value, onChange }: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#EEE7DB",
        borderRadius: 12,
        padding: 4,
      }}
    >
      <TouchableOpacity
        onPress={() => onChange(true)}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 10,
          backgroundColor: value === true ? colors.primary : "transparent",
        }}
      >
        <Text
          style={{
            color: value === true ? "#fff" : colors.textPrimary,
            fontWeight: "600",
          }}
        >
          Yes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onChange(false)}
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 10,
          backgroundColor: value === false ? colors.primary : "transparent",
        }}
      >
        <Text
          style={{
            color: value === false ? "#fff" : colors.textPrimary,
            fontWeight: "600",
          }}
        >
          No
        </Text>
      </TouchableOpacity>
    </View>
  );
}