import AppBackground from "../components/AppBackground";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiscoverStackParamList } from "../types/navigation";
import { colors } from "../theme/theme";
import { Feather } from "@expo/vector-icons";
import TagPill from "../components/TagPill";

type CafeDetailScreenProps = {
  route: RouteProp<DiscoverStackParamList, "CafeDetail">;
  navigation: NativeStackNavigationProp<DiscoverStackParamList, "CafeDetail">;
};

const placeholderImage =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1200&auto=format&fit=crop";

export default function CafeDetailScreen({
  route,
  navigation,
}: CafeDetailScreenProps) {
  const { cafe } = route.params;

  const tags = cafe.tags?.length ? cafe.tags : [];

  return (
    <AppBackground>
      <ScrollView contentContainerStyle={{ paddingBottom: 28 }}>
        {/* Header and back button */}
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 55,
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: "rgba(255,253,248,0.92)",
              borderWidth: 1,
              borderColor: "#DDD4C6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="chevron-left" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "center",
              flex: 0.88,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                fontFamily: "SerifDisplay",
                color: colors.textPrimary,
                marginBottom: 4,
              }}
            >
              Café Details
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: 180,
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#DDD4C6",
                }}
              />
              <Text
                style={{
                  marginHorizontal: 10,
                  fontSize: 12,
                  color: colors.textSecondary,
                }}
              >
                ❦
              </Text>
              <View
                style={{
                  flex: 1,
                  height: 1,
                  backgroundColor: "#DDD4C6",
                }}
              />
            </View>
          </View>
        </View>

        {/* Cafe Hero Image */}
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 12,
          }}
        >
          <Image
            source={{ uri: cafe.hero_image_url || placeholderImage }}
            style={{
              width: "100%",
              height: 280,
              backgroundColor: "#ddd",
              borderRadius: 20,
            }}
            resizeMode="cover"
          />
        </View>

        {/* Details */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 18,
            paddingBottom: 8,
            alignItems: "center",
          }}
        >
          {/* Cafe name */}
          <Text
            style={{
              fontSize: 36,
              fontFamily: "SerifDisplay",
              color: colors.primaryDeep,
              marginBottom: 8,
              textAlign: "center",
            }}
          >
            {cafe.name}
          </Text>

          {/* Cafe Address */}
          <Text
            style={{
              color: "#8E867C",
              fontSize: 16,
              lineHeight: 20,
              marginBottom: 6,
              textAlign: "center",
            }}
          >
            {cafe.address_line_1 ?? "No address"}
            {cafe.city ? `, ${cafe.city}` : ""}
          </Text>

          {/* Cafe Instagram */}
          {cafe.instagram_url ? (
            <Text
              style={{
                color: colors.textSecondary,
                fontSize: 15,
                marginBottom: 14,
                textAlign: "center",
              }}
            >
              {cafe.instagram_url}
            </Text>
          ) : null}

          {/* Cafe Tag Pills */}
          {tags.length > 0 ? (
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              {tags.map((tag) => (
                <TagPill key={tag} label={tag} />
              ))}
            </View>
          ) : null}

          {/* Accent Divider */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
              width: "100%",
            }}
          >
            <View
              style={{
                width: 70,
                height: 1,
                backgroundColor: "#DDD4C6",
                marginRight: 10,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: colors.textSecondary,
              }}
            >
              ❦
            </Text>
            <View
              style={{
                width: 70,
                height: 1,
                backgroundColor: "#DDD4C6",
                marginLeft: 10,
              }}
            />
          </View>

          {/* Cafe Description */}
          {cafe.description ? (
            <Text
              style={{
                fontSize: 16,
                lineHeight: 28,
                color: "#5A5046",
                marginBottom: 26,
                textAlign: "center",
                maxWidth: 340,
              }}
            >
              {cafe.description}
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 15,
                lineHeight: 24,
                color: colors.textSecondary,
                marginBottom: 26,
                textAlign: "center",
              }}
            >
              No description yet.
            </Text>
          )}

          {/* Start Entry Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateEntry", { cafe })}
            style={{
              backgroundColor: "#7E8D70",
              paddingVertical: 16,
              paddingHorizontal: 56,
              borderRadius: 21,
              alignItems: "center",
              shadowColor: "#7A6F5F",
              shadowOpacity: 0.12,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: "#F8F4EC",
                fontWeight: "700",
                fontSize: 18,
                letterSpacing: 0.2,
              }}
            >
              Start Entry
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </AppBackground >
  );
}