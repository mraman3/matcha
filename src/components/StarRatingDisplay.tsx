import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type Props = {
  label: string;
  value: number | null | undefined;
};

function getStarIcon(starIndex: number, value: number) {
  if (value >= starIndex + 1) return "star";
  if (value >= starIndex + 0.5) return "star-half-full";
  return "star-o";
}

export default function StarRatingDisplay({ label, value }: Props) {
  if (value == null) {
    return null;
  }

  return (
    <View style={{ marginBottom: 10 }}>
      <Text
        style={{
          fontSize: 13,
          color: colors.textSecondary,
          marginBottom: 4,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <FontAwesome
              key={i}
              name={getStarIcon(i, Number(value))}
              size={20}
              color={colors.textPrimary}
              style={{ marginRight: 2 }}
            />
          ))}
        </View>

        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: colors.textPrimary,
          }}
        >
          {Number(value).toFixed(1)}/5
        </Text>
      </View>
    </View>
  );
}