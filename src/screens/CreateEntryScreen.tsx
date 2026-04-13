import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createPassportEntry } from "../services/passportEntries";
import { uploadEntryPhoto } from "../services/uploadEntryPhoto";
import { createEntryPhoto } from "../services/createEntryPhoto";
import { DiscoverStackParamList } from "../types/navigation";
import { colors } from "../theme/theme";
import RatingInput from "../components/RatingInput";
import EntryStarRow from "../components/EntryStarRow";
import EntryPriceRow from "../components/EntryPriceRow";
import EntryReturnRow from "../components/EntryReturnRow";
import OrnamentalDivider from "../components/OrnamentalDivider";
import AppBackground from "../components/AppBackground";
import { Feather } from "@expo/vector-icons";


type CreateEntryScreenProps = {
  route: RouteProp<DiscoverStackParamList, "CreateEntry">;
  navigation: NativeStackNavigationProp<DiscoverStackParamList, "CreateEntry">;
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontSize: 12,
        letterSpacing: 1.2,
        textTransform: "uppercase",
        color: colors.textSecondary,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

function DecorativeLeaf({ side }: { side: "left" | "right" }) {
  return (
    <Text
      style={{
        position: "absolute",
        top: side === "left" ? 86 : 122,
        [side]: 10,
        fontSize: 24,
        color: "#B8BEA8",
        opacity: 0.35,
      }}
    >
      ❦
    </Text>
  );
}

function StampMark() {
  return (
    <View
      style={{
        position: "absolute",
        right: -18,
        bottom: -12,
        width: 110,
        height: 110,
        borderRadius: 999,
        borderWidth: 2,
        borderColor: "#9AA488",
        opacity: 0.18,
        alignItems: "center",
        justifyContent: "center",
        transform: [{ rotate: "-14deg" }],
      }}
    >
      <View
        style={{
          width: 78,
          height: 78,
          borderRadius: 999,
          borderWidth: 1.5,
          borderColor: "#9AA488",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 11,
            color: "#748468",
            fontWeight: "700",
            letterSpacing: 1,
          }}
        >
          MATCHA
        </Text>
      </View>
    </View>
  );
}

export default function CreateEntryScreen({
  route,
  navigation,
}: CreateEntryScreenProps) {
  const { cafe } = route.params;
  const [visitDate, setVisitDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ratingOverall, setRatingOverall] = useState(0);
  const [ratingMatcha, setRatingMatcha] = useState(0);
  const [ratingVibe, setRatingVibe] = useState(0);
  const [ratingMannys, setRatingMannys] = useState(0);
  const [priceLevel, setPriceLevel] = useState(2);
  const [wouldReturn, setWouldReturn] = useState<boolean | null>(true);
  const [notes, setNotes] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function handleWebDateChange(event: any) {
    const value = event?.target?.value;
    if (!value) return;

    const nextDate = new Date(`${value}T12:00:00`);
    setVisitDate(nextDate);
  }

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo library access to upload an entry photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setSelectedImageUri(asset.uri);
    setSelectedImageName(asset.fileName ?? null);
  }

  async function handleSave() {
    try {
      setSaving(true);
      const entry = await createPassportEntry({
        profile_id: "11111111-1111-1111-1111-111111111111",
        cafe_id: cafe.id,
        visited_at: visitDate.toISOString(),
        rating_overall: ratingOverall,
        rating_matcha: ratingMatcha,
        rating_vibe: ratingVibe,
        rating_mannys: ratingMannys,
        price_level: priceLevel,
        would_return: wouldReturn,
        notes,
      });

      if (selectedImageUri) {
        const uploadedPhotoUrl = await uploadEntryPhoto({
          uri: selectedImageUri,
          fileName: selectedImageName,
        });

        await createEntryPhoto({
          entry_id: entry.id,
          storage_path: uploadedPhotoUrl,
        });
      }

      Alert.alert("Saved", "Passport entry created successfully.");
      navigation.goBack();
    } catch (error) {
      console.error("handleSave failed:", error);
      Alert.alert("Error", "Failed to save passport entry.");
    } finally {
      setSaving(false);
    }
  }

  const formattedVisitDate = visitDate.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <AppBackground>
      <ScrollView
        scrollEnabled={scrollEnabled}
        contentContainerStyle={{
          padding: 18,
          paddingTop: 0,
          paddingBottom: 34,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            paddingHorizontal: 12,
            paddingTop: 0,
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
              marginBottom: 12,
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
              Thoughts?
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: "rgba(247, 242, 232, 0.60)",
            borderRadius: 26,
            borderWidth: 1,
            borderColor: "#DDD4C6",
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 20,
            shadowColor: "#8C836F",
            shadowOpacity: 0.05,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <DecorativeLeaf side="left" />
          <DecorativeLeaf side="right" />

          <SectionLabel>Entry Notes</SectionLabel>

          <OrnamentalDivider />

          <Text
            style={{
              textAlign: "center",
              fontSize: 17,
              fontWeight: "500",
              color: colors.textSecondary,
              marginBottom: 10,
            }}
          >
            ✦
          </Text>

          <Text
            style={{
              textAlign: "center",
              fontSize: 26,
              fontFamily: "SerifDisplay",
              color: colors.textPrimary,
              marginTop: 0,
              marginBottom: 1,
            }}
          >
            {cafe.name}
          </Text>

          {Platform.OS === "web" ? (
            <View
              style={{
                alignSelf: "center",
                marginBottom: 14,
              }}
            >
              <input
                type="date"
                value={visitDate.toISOString().split("T")[0]}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleWebDateChange}
                style={{
                  padding: "8px 14px",
                  borderRadius: "999px",
                  border: "1px solid #DDD4C6",
                  background: "rgba(255,253,248,0.7)",
                  color: "#9A9187",
                  fontSize: "12px",
                  outline: "none",
                }}
              />
            </View>
          ) : (
            <>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                activeOpacity={0.85}
                style={{
                  alignSelf: "center",
                  paddingHorizontal: 14,
                  paddingVertical: 8,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: "#DDD4C6",
                  backgroundColor: "rgba(255,253,248,0.7)",
                  marginBottom: 14,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#9A9187",
                    letterSpacing: 0.2,
                  }}
                >
                  {formattedVisitDate}
                </Text>
              </TouchableOpacity>

              {showDatePicker && (
                <DateTimePicker
                  value={visitDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "spinner" : "default"}
                  maximumDate={new Date()}
                  onChange={(_, selectedDate) => {
                    if (Platform.OS !== "ios") {
                      setShowDatePicker(false);
                    }

                    if (selectedDate) {
                      setVisitDate(selectedDate);
                    }
                  }}
                />
              )}

              {Platform.OS === "ios" && showDatePicker && (
                <TouchableOpacity
                  onPress={() => setShowDatePicker(false)}
                  style={{
                    alignSelf: "center",
                    marginBottom: 14,
                    marginTop: -2,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                      color: "#7E8D70",
                    }}
                  >
                    Done
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}

          <View
            style={{
              alignItems: "center",
              paddingBottom: 0,
            }}
          >
            <RatingInput
              value={ratingOverall}
              onChange={setRatingOverall}
              centered
              showReset={false}
              starColor="#6F7F63"
              starSize={35}
              onSlideStart={() => setScrollEnabled(false)}
              onSlideEnd={() => setScrollEnabled(true)}
            />
          </View>

          <OrnamentalDivider />

          <EntryStarRow
            label="Matcha"
            value={ratingMatcha}
            onChange={setRatingMatcha}
            onSlideStart={() => setScrollEnabled(false)}
            onSlideEnd={() => setScrollEnabled(true)}
          />

          <EntryStarRow
            label="Vibe"
            value={ratingVibe}
            onChange={setRatingVibe}
            onSlideStart={() => setScrollEnabled(false)}
            onSlideEnd={() => setScrollEnabled(true)}
          />

          <EntryStarRow
            label="Manny"
            value={ratingMannys}
            onChange={setRatingMannys}
            onSlideStart={() => setScrollEnabled(false)}
            onSlideEnd={() => setScrollEnabled(true)}
          />

          <EntryPriceRow value={priceLevel} onChange={setPriceLevel} />

          <EntryReturnRow value={wouldReturn} onChange={setWouldReturn} />

          <OrnamentalDivider />

          <View style={{ paddingTop: 2, marginBottom: 14 }}>
            <Text
              style={{
                fontSize: 12,
                letterSpacing: 1.1,
                textTransform: "uppercase",
                color: "#9A9187",
                marginBottom: 10,
              }}
            >
              Notes
            </Text>

            <TextInput
              value={notes}
              onChangeText={setNotes}
              multiline
              placeholder="Chill spot! Loved their iced matcha latte..."
              placeholderTextColor="#8E9A84"
              style={{
                minHeight: 170,
                fontFamily: "Handwritten",
                fontSize: 32,
                lineHeight: 56,
                color: "#6F7F63",
                textAlignVertical: "top",
                paddingTop: 0,
              }}
            />
          </View>

          <View
            style={{
              marginBottom: 20,
            }}
          >
            <SectionLabel>Entry Photo</SectionLabel>

            <TouchableOpacity
              onPress={handlePickImage}
              style={{
                height: 148,
                borderRadius: 18,
                borderWidth: 1,
                borderColor: "#DDD4C6",
                backgroundColor: "#F4EEE4",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {selectedImageUri ? (
                <Image
                  source={{ uri: selectedImageUri }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              ) : (
                <>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.textPrimary,
                      marginBottom: 4,
                    }}
                  >
                    Add Entry Photo
                  </Text>

                  <Text
                    style={{
                      fontSize: 13,
                      color: colors.textSecondary,
                    }}
                  >
                    Tap to choose an image
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <View style={{ position: "relative", paddingBottom: 4 }}>
            <StampMark />

            <TouchableOpacity
              onPress={handleSave}
              disabled={saving}
              style={{
                backgroundColor: "#7E8D70",
                paddingVertical: 17,
                borderRadius: 999,
                alignItems: "center",
                opacity: saving ? 0.7 : 1,
                marginTop: 4,
              }}
            >
              <Text
                style={{
                  color: "#F8F4EC",
                  fontWeight: "700",
                  fontSize: 18,
                  letterSpacing: 0.15,
                }}
              >
                {saving ? "Saving..." : "Save Entry"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </AppBackground>
  );
}