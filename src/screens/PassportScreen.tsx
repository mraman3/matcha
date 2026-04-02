import { useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  getPassportHistory,
  PassportHistoryItem,
} from "../services/passportHistory";
import { deletePassportEntry } from "../services/deletePassportEntry";
import PassportCard from "../components/PassportCard";
import { colors } from "../theme/theme";
import AppBackground from "../components/AppBackground";

const TEMP_PROFILE_ID = "11111111-1111-1111-1111-111111111111";

export default function PassportScreen() {
  const [entries, setEntries] = useState<PassportHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadHistory(isRefresh = false) {
    try {
      setError(null);

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const data = await getPassportHistory(TEMP_PROFILE_ID);
      setEntries(data);
    } catch (err: any) {
      console.error("Passport history screen error:", err);
      setError(err?.message ?? "Failed to load passport history.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  async function handleDelete(entryId: string) {
    try {
      await deletePassportEntry(entryId);
      await loadHistory(true);
    } catch (err) {
      console.error("Delete failed:", err);
      Alert.alert("Error", "Failed to delete entry.");
    }
  }

  if (loading) {
    return (
      <AppBackground>
        <View
          style={{
            flex: 1,
            padding: 16,

          }}
        >
          <Text style={{
            fontSize: 22,
            fontFamily: "SerifDisplay",
            color: colors.textPrimary,
            textAlign: "center",
            marginTop: 28,
          }}>Loading passport...</Text>
        </View>
      </AppBackground>
    );
  }
  if (error) {
    return (
      <AppBackground>
        <View
          style={{
            flex: 1,
            padding: 16,
          }}
        >
          <Text>{error}</Text>
        </View>
      </AppBackground>
    );
  }

  return (
    <AppBackground>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 0 }}>
          <Text
            style={{
              fontSize: 30,
              fontFamily: "SerifDisplay",
              color: colors.textPrimary,
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Passport
          </Text>

          <Text
            style={{
              color: colors.textSecondary,
              marginBottom: 0,
              fontSize: 13,
              letterSpacing: 1,
              textAlign: "center",
            }}
          >
            {entries.length} entr{entries.length === 1 ? "y" : "ies"} saved
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 0,
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

          <FlatList
            data={entries}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 28 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => loadHistory(true)}
              />
            }
            ListEmptyComponent={
              <View
                style={{
                  paddingVertical: 40,
                  paddingHorizontal: 20,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 22,
                    fontFamily: "SerifDisplay",
                    color: colors.textPrimary,
                    textAlign: "center",
                    marginBottom: 8,
                  }}
                >
                  No entries yet
                </Text>

                <Text
                  style={{
                    color: colors.textSecondary,
                    fontSize: 14,
                    lineHeight: 22,
                    textAlign: "center",
                    maxWidth: 280,
                  }}
                >
                  Start your passport by visiting a matcha spot and creating your first entry from Discover.
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <PassportCard
                entry={item}
                onDelete={() => handleDelete(item.id)}
              />
            )}
          />
        </View>
      </View>
    </AppBackground>
  );
}