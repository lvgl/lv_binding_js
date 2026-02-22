import React from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";
import { ListItem } from "../components/ListItem";

const { width, height } = Dimensions.window;

export function LogListPage() {
  const t = useT();
  const navigate = useNavigate();

  const logItems = [
    { id: "alerts", title: t("logs.alerts"), badge: "999+", badgeColor: "0xFF0000" },
    { id: "notification", title: t("logs.notification"), badge: "5", badgeColor: "0x4267FF" },
  ];

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("logs.title")} backIcon={"./demo/gateway/assets/nav_icon/event_log.png"} />

      <View style={style.content}>
        <View style={style.scrollBox}>
          {logItems.map((item, index) => (
            <ListItem
              key={item.id}
              title={item.title}
              badge={item.badge}
              badgeColor={item.badgeColor}
              autoFocus={index === 0}
              onClick={() => navigate(`/logs/${item.id}`)}
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
