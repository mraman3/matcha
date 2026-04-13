import { useMemo, useRef, useState } from "react";
import { View, Text, PanResponder, LayoutChangeEvent } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../theme/theme";

type Props = {
  label: string;
  value: number;
  onChange: (value: number) => void;
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

export default function EntryStarRow({
  label,
  value,
  onChange,
  onSlideStart,
  onSlideEnd,
}: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackX = useRef(0);

  function updateFromTouch(pageX: number) {
    if (!trackWidth) return;

    const relativeX = clamp(pageX - trackX.current, 0, trackWidth);
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
    setTrackWidth(event.nativeEvent.layout.width);

    const target = event.currentTarget as unknown as {
      measureInWindow?: (
        callback: (x: number, y: number, width: number, height: number) => void
      ) => void;
    };

    if (target?.measureInWindow) {
      target.measureInWindow((x) => {
        trackX.current = x;
      });
    }
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

        <View
          onLayout={handleTrackLayout}
          {...panResponder.panHandlers}
          style={{ flexDirection: "row" }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <View key={i} style={{ marginLeft: 3 }}>
              <FontAwesome
                name={getStarIcon(i, value)}
                size={35}
                color="#748468"
              />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}