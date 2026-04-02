import { View, Text, TouchableOpacity, Image, Alert, Platform } from "react-native";
import { Cafe } from "../types/database";
import { colors } from "../theme/theme";

type Props = {
  cafe: Cafe;
  onPress: () => void;
  onDelete: () => void;

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

export default function CafeCard({ cafe, onPress, onDelete }: Props) {
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
      {/** Hero Image */}
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

      {/** Cafe Name */}
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

        {/** Cafe Address */}
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

        {/** Divider Line */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E7DFD2",
            marginBottom: 12,
          }}
        />

        {/** Cafe Tags */}
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

        {/** View Café Button */}
        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: "#7E8D70",
            paddingVertical: 14,
            borderRadius: 16,
            alignItems: "center",
            marginBottom: 10,
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


        <TouchableOpacity
          onPress={() => {
            if (Platform.OS === "web") {
              const confirmed = window.confirm(
                "Are you sure you want to delete this café? This will also remove its photo."
              );

              if (confirmed) {
                onDelete();
              }

              return;
            }

            Alert.alert(
              "Delete café?",
              "Are you sure you want to delete this café? This will also remove its photo.",
              [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: onDelete },
              ]
            );
          }}
          style={{
            backgroundColor: "#EEE7DB",
            paddingVertical: 12,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.textPrimary,
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Delete Café
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}