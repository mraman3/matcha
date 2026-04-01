import { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getCafes } from "../services/cafes";
import { Cafe } from "../types/database";
import { DiscoverStackParamList } from "../types/navigation";
import AppBackground from "../components/AppBackground";
import { colors } from "../theme/theme";
import CafeCard from "../components/CafeCard";

type DiscoverScreenProps = {
  navigation: NativeStackNavigationProp<
    DiscoverStackParamList,
    "DiscoverHome"
  >;
};

export default function DiscoverScreen({ navigation }: DiscoverScreenProps) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  async function loadCafes() {
    try {
      const data = await getCafes();
      setCafes(data);
    } catch (error) {
      console.error("Failed to load cafes:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCafes();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadCafes();
    }, [])
  );

  const filteredCafes = useMemo(() => {
    const q = query.trim().toLowerCase();

    if (!q) return cafes;

    return cafes.filter((cafe) => {
      return (
        cafe.name.toLowerCase().includes(q) ||
        (cafe.city ?? "").toLowerCase().includes(q) ||
        (cafe.address_line_1 ?? "").toLowerCase().includes(q)
      );
    });
  }, [cafes, query]);

  const hasNoCafes = !loading && cafes.length === 0;
  const hasNoSearchResults = !loading && cafes.length > 0 && filteredCafes.length === 0;

  return (
    <AppBackground>
      <View style={{ flex: 1, padding: 16, paddingTop: 20, paddingBottom: 0 }}>
        <View
          style={{
            alignItems: "center",
            marginBottom: 18,
            marginTop: 40,
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
            Discover
          </Text>

          <Text
            style={{
              fontSize: 13,
              color: colors.textSecondary,
              letterSpacing: 1.4,
              marginBottom: 8,
            }}
          >
            MATCHA SPOTS
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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 18,
          }}
        >
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search matcha spots..."
            placeholderTextColor="#9A9187"
            style={{
              flex: 1,
              backgroundColor: "rgba(255,253,248,0.9)",
              borderRadius: 18,
              paddingVertical: 14,
              paddingHorizontal: 16,
              borderWidth: 1,
              borderColor: "#DDD4C6",
              fontSize: 16,
              color: colors.textPrimary,
              marginRight: 10,
            }}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate("AddCafe")}
            style={{
              width: 50,
              height: 50,
              borderRadius: 16,
              backgroundColor: "#EEE7DB",
              borderWidth: 1,
              borderColor: "#DDD4C6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="plus" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        {loading ? (
          <Text style={{ color: colors.textSecondary }}>Loading cafés...</Text>
        ) : hasNoCafes ? (
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: colors.border,
              padding: 20,
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "700",
                color: colors.textPrimary,
                marginBottom: 8,
              }}
            >
              No cafés added yet
            </Text>

            <Text
              style={{
                color: colors.textSecondary,
                lineHeight: 22,
                marginBottom: 16,
              }}
            >
              Start building your Matcha Passport by adding your first café.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("AddCafe")}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                Add First Café
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={filteredCafes}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              hasNoSearchResults ? (
                <View style={{ paddingVertical: 20 }}>
                  <Text style={{ marginBottom: 12, color: colors.textSecondary }}>
                    No cafés found for "{query}".
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AddCafe", { initialQuery: query })
                    }
                    style={{
                      padding: 14,
                      borderRadius: 14,
                      backgroundColor: "#FFFDF9",
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: colors.textPrimary,
                      }}
                    >
                      Add "{query}" as a new café
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
            renderItem={({ item }) => (
              <CafeCard
                cafe={item}
                onPress={() => navigation.navigate("CafeDetail", { cafe: item })}
              />
            )}
          />
        )}
      </View>
    </AppBackground>
  );
}