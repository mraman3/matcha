import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type Props = {
  label?: string;
  value: number;
  onChange: (value: number) => void;
  centered?: boolean;
  showReset?: boolean;
  starColor?: string;
  starSize?: number;
};

function getStarIcon(starIndex: number, value: number) {
  if (value >= starIndex + 1) return "star";
  if (value >= starIndex + 0.5) return "star-half-full";
  return "star-o";
}

export default function RatingInput({
  label,
  value,
  onChange,
  centered = false,
  showReset = true,
  starColor = colors.textPrimary,
  starSize = 34,
}: Props) {
  return (
    <View style={{ marginBottom: 4, alignItems: centered ? "center" : "stretch" }}>
      {label ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              color: colors.textPrimary,
            }}
          >
            {label}
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: colors.textSecondary,
              fontWeight: "600",
            }}
          >
            {value.toFixed(1)}/5
          </Text>
        </View>
      ) : null}

      <View style={{ flexDirection: "row", justifyContent: centered ? "center" : "flex-start" }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={{ position: "relative", marginRight: 6 }}>
            <FontAwesome
              name={getStarIcon(i, value)}
              size={starSize}
              color={starColor}
            />

            <TouchableOpacity
              onPress={() => onChange(i + 0.5)}
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: "50%",
              }}
            />

            <TouchableOpacity
              onPress={() => onChange(i + 1)}
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: "50%",
              }}
            />
          </View>
        ))}
      </View>

      {showReset ? (
        <TouchableOpacity
          onPress={() => onChange(0)}
          style={{
            marginTop: 10,
            alignSelf: centered ? "center" : "flex-start",
            paddingVertical: 7,
            paddingHorizontal: 12,
            borderRadius: 10,
            backgroundColor: "#EEE7DB",
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: "600",
            }}
          >
            Reset
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}