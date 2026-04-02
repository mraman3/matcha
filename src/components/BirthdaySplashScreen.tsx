import { useEffect, useRef } from "react";
import {
    View,
    Text,
    Animated,
    Easing,
    Image,
} from "react-native";
import AppBackground from "./AppBackground";
import { colors } from "../theme/theme";

const splashStamps = [
    require("../../assets/images/stamp.png"),
    require("../../assets/images/stamp-1.png"),
    require("../../assets/images/stamp-2.png"),
    require("../../assets/images/stamp-3.png"),
    require("../../assets/images/stamp-4.png"),
];

type Props = {
    onFinish: () => void;
};

export default function BirthdaySplashScreen({ onFinish }: Props) {
    const fade = useRef(new Animated.Value(0)).current;
    const scale = useRef(new Animated.Value(0.92)).current;
    const stampScale = useRef(new Animated.Value(0.8)).current;
    const stampRotate = useRef(new Animated.Value(-8)).current;
    const splashScreenTime = 3500;

    const randomStamp =
        splashStamps[Math.floor(Math.random() * splashStamps.length)];

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fade, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(scale, {
                toValue: 1,
                duration: 500,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.sequence([
                Animated.delay(250),
                Animated.parallel([
                    Animated.spring(stampScale, {
                        toValue: 1,
                        friction: 6,
                        tension: 70,
                        useNativeDriver: true,
                    }),
                    Animated.timing(stampRotate, {
                        toValue: 0,
                        duration: 450,
                        easing: Easing.out(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ]),
        ]).start();

        const timer = setTimeout(() => {
            Animated.timing(fade, {
                toValue: 0,
                duration: 350,
                easing: Easing.in(Easing.ease),
                useNativeDriver: true,
            }).start(() => onFinish());
        }, splashScreenTime);

        return () => clearTimeout(timer);
    }, [fade, scale, stampScale, stampRotate, onFinish]);

    const rotation = stampRotate.interpolate({
        inputRange: [-12, 12],
        outputRange: ["-12deg", "12deg"],
    });

    return (
        <AppBackground>
            <Animated.View
                style={{
                    flex: 1,
                    opacity: fade,
                    transform: [{ scale }],
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 24,
                }}
            >
                <View
                    style={{
                        width: "100%",
                        maxWidth: 420,
                        backgroundColor: "rgba(255,253,248,0.94)",
                        borderRadius: 24,
                        borderWidth: 1,
                        borderColor: "#DDD4C6",
                        paddingVertical: 34,
                        paddingHorizontal: 24,
                        alignItems: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <Text
                        style={{
                            position: "absolute",
                            top: 18,
                            left: 18,
                            fontSize: 18,
                            color: "#B4BBA6",
                            opacity: 0.8,
                        }}
                    >
                        ❦
                    </Text>

                    <Text
                        style={{
                            position: "absolute",
                            top: 18,
                            right: 18,
                            fontSize: 18,
                            color: "#B4BBA6",
                            opacity: 0.8,
                        }}
                    >
                        ❦
                    </Text>

                    <Text
                        style={{
                            fontSize: 12,
                            letterSpacing: 1.4,
                            textTransform: "uppercase",
                            color: colors.textSecondary,
                            marginBottom: 10,
                        }}
                    >
                        Birthday Edition
                    </Text>

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: 16,
                        }}
                    >
                        <View
                            style={{
                                width: 60,
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
                                width: 60,
                                height: 1,
                                backgroundColor: "#DDD4C6",
                                marginLeft: 10,
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            fontSize: 32,
                            fontFamily: "SerifDisplay",
                            color: colors.primaryDeep,
                            textAlign: "center",
                            marginBottom: 8,
                        }}
                    >
                        Amnit’s Birthday{"\n"}Passport
                    </Text>

                    <Text
                        style={{
                            fontSize: 17,
                            fontFamily: "Handwritten",
                            color: "#6F7F63",
                            textAlign: "center",
                            marginBottom: 26,
                        }}
                    >
                        Matcha Adventure Begins
                    </Text>

                    <Animated.View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            transform: [{ scale: stampScale }, { rotate: rotation }],
                        }}
                    >
                        <Image
                            source={randomStamp}
                            resizeMode="contain"
                            style={{
                                width: 120,
                                height: 120,
                                opacity: 0.92,
                            }}
                        />

                        <View
                            style={{
                                position: "absolute",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "700",
                                    letterSpacing: 1,
                                    color: "#F8F4EC",
                                    textTransform: "uppercase",
                                }}
                            >
                                Birthday
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    fontWeight: "700",
                                    letterSpacing: 1,
                                    color: "#F8F4EC",
                                    textTransform: "uppercase",
                                }}
                            >
                                Edition
                            </Text>
                        </View>
                    </Animated.View>

                    <Text
                        style={{
                            marginTop: 22,
                            fontSize: 13,
                            color: colors.textSecondary,
                            textAlign: "center",
                        }}
                    >
                        loading little matcha moment...
                    </Text>
                </View>
            </Animated.View>
        </AppBackground>
    );
}