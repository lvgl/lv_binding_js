import React from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";
import { ListItem } from "../components/ListItem";

const { width, height } = Dimensions.window;

export function SettingsPage() {
  const t = useT();
  const navigate = useNavigate();

  const settingsItems = [
    { id: "language", title: "settings.language", path: "/settings/language" },
    { id: "exportLogs", title: "settings.exportLogs", path: "/settings/export-logs" },
    { id: "clearLogs", title: "settings.clearLogs", path: "/settings/clear-logs" },
    { id: "countdown", title: "settings.countdown", path: "/settings/countdown" },
  ];

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("settings.title")} backIcon={"./demo/gateway/assets/nav_icon/settings.png"} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {settingsItems.map((item, index) => (
            <ListItem
              key={item.id}
              title={item.title}
              autoFocus={index === 0}
              onClick={() => navigate(item.path)}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const style = CreateStyle({
  pageRoot: {
    width,
    height,
    padding: 0,
    "background-color": "black",
    display: "flex",
    "flex-direction": "column",
    overflow: "hidden",
  },
  content: {
    width,
    height: height - 52,
    padding: 12,
    display: "flex",
    "flex-direction": "column",
  },
  scrollBox: {
    width: width - 24,
    height: height - 52 - 24,
    padding: 8,
    "background-color": "0x101010",
    "border-radius": 10,
    overflow: 0,
    "overflow-scrolling": 1,
    display: "flex",
    "flex-direction": "column",
  },
});
