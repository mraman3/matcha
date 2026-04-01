import { TouchableOpacity, Text } from "react-native";
import { colors } from "../theme/theme";

type Props = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export default function SelectableTagPill({
  label,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
        backgroundColor: selected ? colors.primary : "#F1ECE2",
      }}
    >
      <Text
        style={{
          fontSize: 13,
          fontWeight: "600",
          color: selected ? "#fff" : colors.textPrimary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}