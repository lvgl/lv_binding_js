import React from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

export function ExportLogsPage() {
  const t = useT();
  const navigate = useNavigate();

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("exportLogs.title")} />

      <View style={style.content} addToFocusGroup>
        <View style={style.messageBox}>
          <Text style={style.messageText}>
            {t("exportLogs.title")}
          </Text>
          <Text style={style.hintText}>
            Exporting logs to Micro SD card...
          </Text>
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
    "justify-content": "center",
    "align-items": "center",
  },
  messageBox: {
    width: width - 48,
    padding: 24,
    "background-color": "0x101010",
    "border-radius": 12,
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  },
  messageText: {
    "text-color": "white",
    "font-size": 18,
    "margin-bottom": 12,
  },
  hintText: {
    "text-color": "0xb0b0b0",
    "font-size": 14,
  },
});
