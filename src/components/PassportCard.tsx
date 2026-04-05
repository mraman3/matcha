import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import { colors } from "../theme/theme";
import { PassportHistoryItem } from "../services/passportHistory";
import PassportRatingCell from "./PassportRatingCell";

const paperBg = require("../../assets/images/vintage-paper-bg.png");

const stamps = [
  require("../../assets/images/stamp.png"),
  require("../../assets/images/stamp-1.png"),
  require("../../assets/images/stamp-2.png"),
  require("../../assets/images/stamp-3.png"),
  require("../../assets/images/stamp-4.png"),
];

type Props = {
  entry: PassportHistoryItem;
  onDelete: () => void;
};

function formatVisitedDate(dateString: string) {
  const date = new Date(dateString);

  const month = date.toLocaleDateString(undefined, { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  function getOrdinalSuffix(day: number) {
    if (day >= 11 && day <= 13) return "th";

    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`;
}

function formatPriceLevel(priceLevel?: number | null) {
  if (!priceLevel) return null;
  return "$".repeat(priceLevel);
}

function getStampMeta(entryId: string) {
  const chars = entryId.replace(/-/g, "");
  let hash = 0;

  for (let i = 0; i < chars.length; i++) {
    hash = (hash * 31 + chars.charCodeAt(i)) % 1000000;
  }

  return {
    stampIndex: hash % 5,
    left: 8 + (hash % 196),
    top: -25 + (hash % 10),
    rotation: -18 + (hash % 36),
  };
}

export default function PassportCard({ entry, onDelete }: Props) {
  const stampMeta = getStampMeta(entry.id);
  const selectedStamp = stamps[stampMeta.stampIndex];
  const stampLeft = stampMeta.left;
  const stampTop = stampMeta.top;
  const stampRotation = stampMeta.rotation;

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: colors.border,
        marginBottom: 18,
        overflow: "hidden",
        opacity: 0.85,
      }}
    >
      {entry.entryPhotoUrl ? (
        <ImageBackground
          source={paperBg}
          resizeMode="stretch"
          style={{
            width: "auto",
            height: "auto",
            margin: 12,
            marginBottom: 0,
            padding: 10,
          }}
        >
          <Image
            source={{ uri: entry.entryPhotoUrl }}
            style={{
              width: 190,
              height: 190,
              borderRadius: 8,
              backgroundColor: "#EDE7DC",
            }}
            resizeMode="cover"
          />
        </ImageBackground>
      ) : null}

      <View style={{ padding: 18 }}>


        <Text
          style={{
            fontSize: 30,
            fontFamily: "SerifDisplay",
            color: colors.primaryDeep,
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {entry.cafe?.name ?? "Unknown Cafe"}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#DDD4C6",
              marginRight: 10,
            }}
          />

          <Text
            style={{
              color: "#8E867C",
              fontSize: 13,
              lineHeight: 20,
              textAlign: "center",
            }}
          >
            {formatVisitedDate(entry.visited_at)}
            {entry.price_level != null ? ` • ${formatPriceLevel(entry.price_level)}` : ""}
            {entry.would_return != null
              ? ` • ${entry.would_return ? "Would Return" : "Would Not Return"}`
              : ""}
          </Text>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#DDD4C6",
              marginLeft: 10,
            }}
          />
        </View>

        {/* Rating Quadrant */}
        <View
          style={{
            width: "100%",
            height: 220,
            marginBottom: 16,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Image
            source={paperBg}
            resizeMode="stretch"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.9,
            }}
          />

          {/* horizontal divider */}
          <View
            style={{
              position: "absolute",
              left: 18,
              right: 18,
              top: "50%",
              height: 1,
              backgroundColor: "#DCCFC0",
            }}
          />

          {/* vertical divider */}
          <View
            style={{
              position: "absolute",
              top: 18,
              bottom: 18,
              left: "50%",
              width: 1,
              backgroundColor: "#DCCFC0",
            }}
          />

          {/* horizontal divider accents */}
          <Text
            style={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: [{ translateY: -10 }],
              fontSize: 12,
              color: "#A8AF98",
            }}
          >
            ❦
          </Text>
          <Text
            style={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: [{ translateY: -10 }],
              fontSize: 12,
              color: "#A8AF98",
            }}
          >
            ❦
          </Text>

          {/* vertical divider accents */}
          <Text
            style={{
              position: "absolute",
              top: 4,
              left: "50%",
              transform: [{ translateX: -6 }],
              fontSize: 12,
              color: "#A8AF98",
            }}
          >
            ❦
          </Text>
          <Text
            style={{
              position: "absolute",
              bottom: 4,
              left: "50%",
              transform: [{ translateX: -6 }],
              fontSize: 12,
              color: "#A8AF98",
            }}
          >
            ❦
          </Text>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              flexWrap: "wrap",
              paddingTop: 18,
              paddingBottom: 18,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                width: "50%",
                paddingTop: 0,
                paddingRight: 14,
                paddingBottom: 14,
              }}
            >
              <PassportRatingCell label="Overall" value={entry.rating_overall} />
            </View>

            <View
              style={{
                width: "50%",
                paddingTop: 0,
                paddingLeft: 14,
                paddingBottom: 14,
              }}
            >
              <PassportRatingCell label="Matcha" value={entry.rating_matcha} />
            </View>

            <View
              style={{
                width: "50%",
                paddingTop: 0,
                paddingRight: 14,
              }}
            >
              <PassportRatingCell label="Vibe" value={entry.rating_vibe} />
            </View>

            <View
              style={{
                width: "50%",
                paddingTop: 0,
                paddingLeft: 14,
              }}
            >
              <PassportRatingCell label="Manny's Rating" value={entry.rating_mannys} />
            </View>
          </View>
        </View>

        <View style={{ position: "relative", minHeight: 90, marginBottom: 12 }}>
          <Image
            source={selectedStamp}
            style={{
              position: "absolute",
              width: 180,
              height: 180,
              left: stampLeft,
              top: stampTop,
              opacity: 0.55,
              transform: [{ rotate: `${stampRotation}deg` }],
            }}
            resizeMode="contain"
          />
        </View>

        {/* Notes Box */}
        {entry.notes ? (
          <View
            style={{
              backgroundColor: "rgba(255,253,248,0.88)",
              borderRadius: 16,
              borderWidth: 1,
              borderColor: "#DDD4C6",
              paddingTop: 12,
              paddingHorizontal: 14,
              paddingBottom: 14,
              marginBottom: 14,
              opacity: 0.8,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                letterSpacing: 1.2,
                color: colors.textSecondary,
                marginBottom: 8,
                textTransform: "uppercase",
              }}
            >
              Notes
            </Text>

            <Text
              style={{
                fontFamily: "Handwritten",
                fontSize: 32,
                lineHeight: 34,
                color: "#6F7F63",
                textAlignVertical: "top",
                paddingTop: 0,
              }}
            >
              {entry.notes}
            </Text>
          </View>
        ) : null}

        {/* Delete button */}
        <TouchableOpacity
          onPress={onDelete}
          style={{
            alignSelf: "flex-start",
            backgroundColor: "#EEE7DB",
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            Delete Entry
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}