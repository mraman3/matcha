import AppBackground from "../components/AppBackground";
import { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DiscoverStackParamList } from "../types/navigation";
import { createCafe } from "../services/createCafe";
import { uploadCafePhoto } from "../services/uploadCafePhoto";
import { getAvailableTags } from "../services/getAvailableTags";
import SelectableTagPill from "../components/SelectableTagPill";
import { colors } from "../theme/theme";
import { Feather } from "@expo/vector-icons";

type AddCafeScreenProps = {
  route: RouteProp<DiscoverStackParamList, "AddCafe">;
  navigation: NativeStackNavigationProp<DiscoverStackParamList, "AddCafe">;
};

function SectionTitle({ title }: { title: string }) {
  return (
    <Text
      style={{
        fontSize: 20,
        fontFamily: "SerifDisplay",
        color: colors.textPrimary,
        marginBottom: 12,
      }}
    >
      {title}
    </Text>
  );
}

function FieldLabel({ label }: { label: string }) {
  return (
    <Text
      style={{
        fontSize: 14,
        color: colors.textSecondary,
        marginBottom: 6,
      }}
    >
      {label}
    </Text>
  );
}

export default function AddCafeScreen({
  route,
  navigation,
}: AddCafeScreenProps) {
  const [name, setName] = useState(route.params?.initialQuery ?? "");
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImageUri, setSelectedImageUri] = useState<string | null>(null);
  const [selectedImageName, setSelectedImageName] = useState<string | null>(null);

  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [newTagInput, setNewTagInput] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadTags() {
      try {
        const tags = await getAvailableTags();
        setAvailableTags(tags);
      } catch (error) {
        console.error("Failed to load available tags:", error);
      }
    }

    loadTags();
  }, []);

  async function handlePickImage() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Please allow photo library access to upload a café photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (result.canceled) return;

    const asset = result.assets[0];
    setSelectedImageUri(asset.uri);
    setSelectedImageName(asset.fileName ?? null);
  }

  function toggleTag(tag: string) {
    setSelectedTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag]
    );
  }

  function handleAddNewTag() {
    const normalized = newTagInput.trim();
    if (!normalized) return;

    const alreadyExists = availableTags.some(
      (tag) => tag.toLowerCase() === normalized.toLowerCase()
    );

    const canonicalTag = alreadyExists
      ? availableTags.find(
        (tag) => tag.toLowerCase() === normalized.toLowerCase()
      ) || normalized
      : normalized;

    if (!alreadyExists) {
      setAvailableTags((current) => [...current, canonicalTag].sort((a, b) => a.localeCompare(b)));
    }

    setSelectedTags((current) =>
      current.includes(canonicalTag) ? current : [...current, canonicalTag]
    );

    setNewTagInput("");
  }

  async function handleSave() {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter a café name.");
      return;
    }

    try {
      setSaving(true);

      let heroImageUrl: string | null = null;

      if (selectedImageUri) {
        heroImageUrl = await uploadCafePhoto({
          uri: selectedImageUri,
          fileName: selectedImageName,
        });
      }

      const cafe = await createCafe({
        name,
        address_line_1: addressLine1,
        city,
        region,
        country,
        postal_code: postalCode,
        instagram_url: instagramUrl,
        website_url: websiteUrl,
        description,
        hero_image_url: heroImageUrl,
        tags: selectedTags,
      });

      if (Platform.OS === "web") {
        window.alert("Café added successfully.");
        navigation.navigate("DiscoverHome");
      } else {
        Alert.alert("Saved", "Café added successfully.", [
          {
            text: "OK",
            onPress: () => navigation.navigate("DiscoverHome"),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to add café.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppBackground>
      <ScrollView
        contentContainerStyle={{
          padding: 18,
          paddingTop: 0,
          paddingBottom: 32,
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
              Add Café
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontSize: 14,
            color: colors.textSecondary,
            marginBottom: 18,
            lineHeight: 22,
            textAlign: "center",
          }}
        >
          Add a new matcha spot to your passport collection.
        </Text>

        <View
          style={{
            backgroundColor: colors.glass,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 18,
            marginBottom: 16,
          }}
        >
          <SectionTitle title="Photo" />

          <TouchableOpacity
            style={{
              height: 180,
              borderRadius: 18,
              borderWidth: 1,
              borderColor: colors.border,
              backgroundColor: "#F3EEE5",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
            onPress={handlePickImage}
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
                  Add Café Photo
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

        <View
          style={{
            backgroundColor: colors.glass,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 18,
            marginBottom: 16,
          }}
        >
          <SectionTitle title="Basic Info" />

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="Café Name *" />
            <TextInput
              value={name}
              onChangeText={setName}
              placeholder="Cafe name"
              placeholderTextColor={colors.textSecondary}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="Address" />
            <TextInput
              value={addressLine1}
              onChangeText={setAddressLine1}
              placeholder="123 Main St"
              placeholderTextColor={colors.textSecondary}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="City" />
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="Toronto"
              placeholderTextColor={colors.textSecondary}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="Region / Province" />
            <TextInput
              value={region}
              onChangeText={setRegion}
              placeholder="Ontario"
              placeholderTextColor={colors.textSecondary}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 0 }}>
            <FieldLabel label="Country" />
            <TextInput
              value={country}
              onChangeText={setCountry}
              placeholder="Canada"
              placeholderTextColor={colors.textSecondary}
              style={inputStyle}
            />
          </View>
        </View>

        <View
          style={{
            backgroundColor: colors.glass,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 18,
            marginBottom: 16,
          }}
        >
          <SectionTitle title="Tags" />

          {availableTags.length > 0 ? (
            <>
              <FieldLabel label="Previously used tags" />
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  marginBottom: 14,
                }}
              >
                {availableTags.map((tag) => (
                  <SelectableTagPill
                    key={tag}
                    label={tag}
                    selected={selectedTags.includes(tag)}
                    onPress={() => toggleTag(tag)}
                  />
                ))}
              </View>
            </>
          ) : null}

          <FieldLabel label="Add a new tag" />
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}>
            <TextInput
              value={newTagInput}
              onChangeText={setNewTagInput}
              placeholder="Study spot"
              placeholderTextColor={colors.textSecondary}
              style={[inputStyle, { flex: 1, marginRight: 10 }]}
            />

            <TouchableOpacity
              onPress={handleAddNewTag}
              style={{
                backgroundColor: "#EEE7DB",
                paddingVertical: 14,
                paddingHorizontal: 16,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  color: colors.textPrimary,
                  fontWeight: "700",
                }}
              >
                Add
              </Text>
            </TouchableOpacity>
          </View>

          {selectedTags.length > 0 ? (
            <>
              <FieldLabel label="Selected for this café" />
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {selectedTags.map((tag) => (
                  <SelectableTagPill
                    key={tag}
                    label={tag}
                    selected
                    onPress={() => toggleTag(tag)}
                  />
                ))}
              </View>
            </>
          ) : (
            <Text style={{ color: colors.textSecondary }}>
              No tags selected yet.
            </Text>
          )}
        </View>

        <View
          style={{
            backgroundColor: colors.glass,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 18,
            marginBottom: 16,
          }}
        >
          <SectionTitle title="Links & Details" />

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="Postal Code" />
            <TextInput
              value={postalCode}
              onChangeText={setPostalCode}
              placeholder="M5V..."
              placeholderTextColor={colors.textSecondary}
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="Instagram URL" />
            <TextInput
              value={instagramUrl}
              onChangeText={setInstagramUrl}
              placeholder="https://instagram.com/..."
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              style={inputStyle}
            />
          </View>

          <View style={{ marginBottom: 14 }}>
            <FieldLabel label="Website URL" />
            <TextInput
              value={websiteUrl}
              onChangeText={setWebsiteUrl}
              placeholder="https://..."
              placeholderTextColor={colors.textSecondary}
              autoCapitalize="none"
              style={inputStyle}
            />
          </View>

          <View>
            <FieldLabel label="Description" />
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="What makes this matcha spot special?"
              placeholderTextColor={colors.textSecondary}
              multiline
              style={[inputStyle, notesStyle]}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSave}
          disabled={saving}
          style={{
            backgroundColor: "#7E8D70",
            paddingVertical: 18,
            borderRadius: 999,
            alignItems: "center",
            opacity: saving ? 0.7 : 1,
            marginTop: 4,
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
            {saving ? "Saving..." : "Save Café"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AppBackground>
  );
}

const inputStyle = {
  backgroundColor: "rgba(255,253,248,0.88)",
  borderWidth: 1,
  borderColor: "#DDD4C6",
  borderRadius: 16,
  paddingVertical: 14,
  paddingHorizontal: 14,
  color: "#342E28",
  fontSize: 15,
} as const;

const notesStyle = {
  minHeight: 120,
  textAlignVertical: "top" as const,
  lineHeight: 22,
};