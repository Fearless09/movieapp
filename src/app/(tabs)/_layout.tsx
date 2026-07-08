import { Colors } from "@/styles/styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { VectorIcon } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { ComponentProps } from "react";
import { useColorScheme } from "react-native";

const TabLayout = () => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "dark" ? "dark" : "light"];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.primary}
      tintColor={colors.primary}
    >
      {tabs.map(({ icon, name }) => (
        <NativeTabs.Trigger key={name} name={name}>
          <NativeTabs.Trigger.Label hidden />
          <NativeTabs.Trigger.Icon
            renderingMode="template"
            src={<VectorIcon family={Ionicons} name={icon} />}
          />
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
};

export default TabLayout;

type Tab = {
  name: string;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
};

const tabs: Tab[] = [
  {
    name: "index",
    label: "Home",
    icon: "home",
  },
  {
    name: `search/[slug]`,
    label: "Search",
    icon: "search",
  },
  {
    name: "watch-list",
    label: "Watch List",
    icon: "list",
  },
];
