import { Tabs } from "expo-router";
import { useEffect } from "react";
import { configureAmplify } from "../../src/api/amplifyConfig";

export default function TabsLayout() {
  useEffect(() => { configureAmplify(); }, []);
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="index" options={{ title: "Feed" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen name="upload" options={{ title: "Upload" }} />
      <Tabs.Screen name="notifications" options={{ title: "Notifs" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
