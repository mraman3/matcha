import { NavigatorScreenParams } from "@react-navigation/native";
import { Cafe } from "./database";

export type DiscoverStackParamList = {
  DiscoverHome: undefined;
  CafeDetail: { cafe: Cafe };
  CreateEntry: { cafe: Cafe };
  AddCafe: { initialQuery?: string } | undefined;
};

export type RootTabParamList = {
  DiscoverTab: NavigatorScreenParams<DiscoverStackParamList>;
  PassportTab: undefined;
};