import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function PriceSelector({ value, onChange }: Props) {
  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {[1, 2, 3, 4].map((level) => {
        const active = value === level;

        return (
          <TouchableOpacity
            key={level}
            onPress={() => onChange(level)}
            style={{
              paddingVertical: 8,
              paddingHorizontal: 10,
              borderRadius: 10,
              backgroundColor: active ? colors.primary : "#EEE7DB",
            }}
          >
            <Text
              style={{
                color: active ? "#fff" : colors.textPrimary,
                fontWeight: "700",
                fontSize: 18,
              }}
            >
              {"$".repeat(level)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}