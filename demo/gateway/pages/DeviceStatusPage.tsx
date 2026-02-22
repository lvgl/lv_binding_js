import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

export function DeviceStatusPage() {
  const t = useT();
  const navigate = useNavigate();

  const statusItems = useMemo(
    () => [
      { label: "CPU Usage", value: "45%" },
      { label: "Memory Usage", value: "62%" },
      { label: "Temperature", value: "45°C" },
      { label: "Uptime", value: "15 days" },
      { label: "Network Status", value: "Connected" },
    ],
    []
  );

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("deviceStatus.title")} backIcon={"./demo/gateway/assets/nav_icon/device_status.png"} />

      <View style={style.scrollBox}>
        {statusItems.map((item, index) => (
          <View
            key={item.label}
            autoFocus={index === 0}
            addToFocusGroup
            onFocusedStyle={style.focused}
            style={style.statusItem}
          >
            <Text style={style.value}>{item.value}</Text>
            <Text style={style.label}>{item.label}</Text>
          </View>
        ))}
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
  scrollBox: {
    width: width,
    height: height - 24,
    padding: 12,
    "background-color": "0x101010",
    overflow: 0,
    "overflow-scrolling": 1,
    display: "flex",
    "flex-direction": "column",
  },
  statusItem: {
    width: "100%",
    height: 160,
    "background-color": "0x2a2a2a",
    margin: "0 0 8px 0",
    padding: "12px",
    display: "flex",
    "flex-direction": "column",
    "align-items": "flex-start",
    "justify-content": "flex-start",
    "scroll-on-focus": 1,
  },
  label: {
    "text-color": "white",
    "opacity": 0.8,
    "font-size": 14,
    "margin-bottom": 8,
  },
  value: {
    "text-color": "white",
    "font-size": 24,
    "font-weight": "bold",
  },
  focused: {
    padding: 12,
    "border-radius": 12,
    "background-color": "#4660FF",
  },
});
