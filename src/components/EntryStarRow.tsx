import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
};

function getStarIcon(starIndex: number, value: number) {
  if (value >= starIndex + 1) return "star";
  if (value >= starIndex + 0.5) return "star-half-full";
  return "star-o";
}

export default function EntryStarRow({ label, value, onChange }: Props) {
  function handleSet(nextValue: number) {
    onChange(value === nextValue ? 0 : nextValue);
  }

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
          {label}
        </Text>

        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={{ position: "relative", marginLeft: 3 }}>
              <FontAwesome
                name={getStarIcon(i, value)}
                size={35}
                color="#748468"
              />

              <TouchableOpacity
                onPress={() => handleSet(i + 0.5)}
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "50%",
                }}
              />

              <TouchableOpacity
                onPress={() => handleSet(i + 1)}
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
      </View>
    </View>
  );
}