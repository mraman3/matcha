import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function EntryPriceRow({ value, onChange }: Props) {
  return (
    <View
      style={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "SerifDisplay",
            color: colors.textPrimary,
          }}
        >
          Price
        </Text>

        <View style={{ flexDirection: "row" }}>
          {[1, 2, 3, 4].map((level) => (
            <TouchableOpacity
              key={level}
              onPress={() => onChange(level)}
              style={{
                marginLeft: 8,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderRadius: 10,
                backgroundColor: value === level ? colors.primary : "#EEE7DB",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: value === level ? "#fff" : colors.textPrimary,
                }}
              >
                {"$".repeat(level)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}