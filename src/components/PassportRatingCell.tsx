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

export default function PassportRatingCell({ label, value }: Props) {
  if (value == null) return null;

  return (
    <View>
      <Text
        style={{
          fontSize: 28,
          color: colors.textSecondary,
          marginBottom: 6,
          textAlign: "center",
          letterSpacing: 0.2,
          fontFamily: "Handwritten",
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 6 }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <FontAwesome
              key={i}
              name={getStarIcon(i, Number(value))}
              size={24}
              color="#748468"
              style={{ marginHorizontal: 2 }}
            />
          ))}
        </View>

        <Text
          style={{
            fontSize: 13,
            fontWeight: "600",
            color: colors.textSecondary,
          }}
        >
          {Number(value).toFixed(1)}/5
        </Text>
      </View>
    </View>
  );
}