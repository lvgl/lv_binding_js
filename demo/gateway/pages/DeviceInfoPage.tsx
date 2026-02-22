import React, { useMemo } from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

interface DeviceInfoSectionProps {
  title: string;
  content: Array<string>;
  autoFocus?: boolean;
}

function DeviceInfoSection({ title, content, autoFocus = false }: DeviceInfoSectionProps) {
  return (
    <View 
     style={style.ethSection}
     autoFocus={autoFocus}
     addToFocusGroup
     onFocusedStyle={style.ethSectionFocused}
    >
      <Text style={style.ethTitle}>{title}</Text>
      <View style={style.ethContent}>
        {content.map((item) => (
          <Text style={style.value}>{item}</Text>
        ))}
      </View>
    </View>
  );
}

export function DeviceInfoPage() {
  const t = useT();
  const navigate = useNavigate();

  const eth1Items = useMemo(
    () => [{
      title: "ETH1",
      content: [
        "IP:192.168.1.100",
        "MAC:00:11:22:33:44:55",
        "Netmask:255.255.255.0",
        "Gateway:192.168.1.1",
      ]
    },
    {
      title: "ETH2",
      content: [
        "IP:192.168.2.100",
        "MAC:00:11:22:33:44:56",
        "Netmask:255.255.255.0",
        "Gateway:192.168.2.1",
      ]
    },
    {
      title: "Version",
      content: [
        "Firmware Version:1.0.0",
        "Studio Version:1.0.0",
      ]
    }
  ], []);
  
  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("deviceInfo.title")} backIcon={"./demo/gateway/assets/nav_icon/device_info.png"} />

      <View style={style.scrollBox}>
        {eth1Items.map((item, index) => (
          <DeviceInfoSection
            key={item.title}
            title={item.title}
            content={item.content}
            autoFocus={index === 0}
          />
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
    height: height - 80,
    padding: "16px",
    "background-color": "0x101010",
    overflow: 0,
    "overflow-scrolling": 1,
    display: "flex",
    "flex-direction": "column",
  },
  ethSection: {
    height: 'auto',
    width: "100%",
    "background-color": "0x2a2a2a",
    display: "flex",
    "flex-direction": "column",
    "padding": "12px",
  },
  ethTitle: {
    "text-color": "white",
    "font-size": 24,
    "font-weight": "bold",
  },
  ethSectionFocused: {
    "background-color": "#4660FF",
    "border-radius": 12,
    "padding": "12px",
  },
  ethContent: {
    width: "100%",
    height: 'auto',
    display: "flex",
    "flex-direction": "column",
  },
  infoItem: {
    width: "100%",
    height: 50,
    "border-radius": 8,
    "background-color": "0x1a1a1a",
    margin: "0 0 8px 0",
    padding: "0 16px",
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "justify-content": "space-between",
  },
  value: {
    "text-color": "#FFFFFF",
    "opacity": 0.8,
    "font-size": 16,
    "font-weight": "normal",
    "text-align": "right",
  },
});
