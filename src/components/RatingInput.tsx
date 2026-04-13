import { useMemo, useRef, useState } from "react";
import { View, Text, PanResponder, LayoutChangeEvent } from "react-native";
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
  onSlideStart?: () => void;
  onSlideEnd?: () => void;
};

function getStarIcon(starIndex: number, value: number) {
  if (value >= starIndex + 1) return "star";
  if (value >= starIndex + 0.5) return "star-half-full";
  return "star-o";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function snapToHalf(value: number) {
  return Math.round(value * 2) / 2;
}

export default function RatingInput({
  label,
  value,
  onChange,
  centered = false,
  showReset = true,
  starColor = "#6F7F63",
  starSize = 34,
  onSlideStart,
  onSlideEnd,
}: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackPageX = useRef(0);

  function updateFromTouch(pageX: number) {
    if (!trackWidth) return;

    const relativeX = clamp(pageX - trackPageX.current, 0, trackWidth);
    const rawValue = (relativeX / trackWidth) * 5;
    const snappedValue = snapToHalf(rawValue);

    onChange(clamp(snappedValue, 0, 5));
  }

const panResponder = useMemo(
  () =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        onSlideStart?.();
        updateFromTouch(evt.nativeEvent.pageX);
      },
      onPanResponderMove: (evt) => {
        updateFromTouch(evt.nativeEvent.pageX);
      },
      onPanResponderRelease: () => {
        onSlideEnd?.();
      },
      onPanResponderTerminate: () => {
        onSlideEnd?.();
      },
    }),
  [trackWidth, onSlideStart, onSlideEnd]
);

  function handleTrackLayout(event: LayoutChangeEvent) {
    const { width, x } = event.nativeEvent.layout;
    setTrackWidth(width);

    // layout.x is parent-relative, so measureInWindow is safer for pageX math
    event.target &&
      (event.currentTarget as any)?.measureInWindow?.(
        (pageX: number) => {
          trackPageX.current = pageX;
        }
      );

    // fallback if measureInWindow is unavailable in this environment
    if (!trackPageX.current) {
      trackPageX.current = x;
    }
  }

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

      <View
        onLayout={handleTrackLayout}
        {...panResponder.panHandlers}
        style={{
          flexDirection: "row",
          justifyContent: centered ? "center" : "flex-start",
          paddingVertical: 6,
        }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <View key={i} style={{ marginRight: 6 }}>
            <FontAwesome
              name={getStarIcon(i, value)}
              size={starSize}
              color={starColor}
            />
          </View>
        ))}
      </View>

      {showReset ? (
        <Text
          style={{
            marginTop: 8,
            alignSelf: centered ? "center" : "flex-start",
            color: colors.textSecondary,
            fontSize: 12,
          }}
          onPress={() => onChange(0)}
        >
          Reset
        </Text>
      ) : null}
    </View>
  );
}