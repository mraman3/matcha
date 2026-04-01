import { View, Text, TouchableOpacity, Image } from "react-native";
import { Cafe } from "../types/database";
import { colors } from "../theme/theme";

type Props = {
  cafe: Cafe;
  onPress: () => void;
};

const placeholderImage =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop";

const stampImage = require("../../assets/images/stamp.png");

function Tag({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: "#EEE7DB",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        marginRight: 8,
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          fontSize: 12,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export default function CafeCard({ cafe, onPress }: Props) {
  const tags = cafe.tags?.length ? cafe.tags : [];

  return (
    <View
      style={{
        backgroundColor: "rgba(255,253,248,0.95)",
        borderRadius: 18,
        marginBottom: 22,
        borderWidth: 1,
        borderColor: "#DDD4C6",
        overflow: "hidden",
      }}
    >
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: cafe.hero_image_url || placeholderImage }}
          style={{
            width: "100%",
            height: 190,
          }}
          resizeMode="cover"
        />

        <Image
          source={stampImage}
          style={{
            position: "absolute",
            width: 125,
            height: 125,
            left: 12,
            bottom: -45,
            opacity: 0.85,
            transform: [{ rotate: "-18deg" }],
          }}
          resizeMode="contain"
        />
      </View>

      <View style={{ padding: 16 }}>
        <Text
          style={{
            fontSize: 30,
            fontFamily: "SerifDisplay",
            color: colors.primaryDeep,
            marginBottom: 2,
            textAlign: "center",
          }}
        >
          {cafe.name}
        </Text>

        <Text
          style={{
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 20,
            marginBottom: 12,
          }}
        >
          {cafe.address_line_1 ?? ""}
          {cafe.city ? `, ${cafe.city}` : ""}
        </Text>

        <View
          style={{
            height: 1,
            backgroundColor: "#E7DFD2",
            marginBottom: 12,
          }}
        />

        {tags.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              marginBottom: 14,
            }}
          >
            {tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </View>
        ) : null}

        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "#7E8D70",
            paddingVertical: 14,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#F8F4EC",
              fontWeight: "700",
              fontSize: 17,
            }}
          >
            View Café
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}