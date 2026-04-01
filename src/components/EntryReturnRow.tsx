import { View, Text, TouchableOpacity } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  value: boolean | null;
  onChange: (value: boolean) => void;
};

export default function EntryReturnRow({ value, onChange }: Props) {
  return (
    <View style={{ paddingVertical: 16 }}>
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
            flex: 1,
            paddingRight: 14,
          }}
        >
          Would you come back?
        </Text>

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
      </View>
    </View>
  );
}