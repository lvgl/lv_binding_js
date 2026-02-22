import React from "react";
import { Dimensions, CreateStyle, Image, Text, useT, View } from "lvgljs-ui";
import { useNavigate } from "react-router";

const { width, height } = Dimensions.window;

const colWidth = (width - 12 * 2 - 12) / 2;
const rowHeight = (height - 12 * 2 - 12) / 2;

export function HomePage() {
  const t = useT();
  const navigate = useNavigate();

  const buttons = [
    { path: "/logs", icon: "./demo/gateway/assets/nav_icon/event_log.png", text: t("header.eventLog"), col: 0, row: 0 },
    { path: "/device-info", icon: "./demo/gateway/assets/nav_icon/device_info.png", text: t("header.deviceInfo"), col: 0, row: 1 },
    { path: "/device-status", icon: "./demo/gateway/assets/nav_icon/device_status.png", text: t("header.deviceStatus"), col: 1, row: 0 },
    { path: "/settings", icon: "./demo/gateway/assets/nav_icon/settings.png", text: t("header.settings"), col: 1, row: 1 },
  ];

  return (
    <View style={style.grid}>
      {buttons.map((btn, index) => (
        <View
          key={btn.path}
          autoFocus={index === 0}
          style={[
            style.button, 
            {
              "grid-column-pos": btn.col,
              "grid-row-pos": btn.row,
            },
          ]}
          addToFocusGroup
          onFocusedStyle={style.focused}
          onClick={() => navigate(btn.path, { state: { from: "home", to: btn.path } })}
        >
          {/* <View style={style.buttonContent}> */}
            <Image src={btn.icon} style={style.image} />
            <Text style={style.buttonText}>{btn.text}</Text>
          {/* </View> */}
        </View>
      ))}
    </View>
  );
}

const style = CreateStyle({
  grid: {
    width,
    height,
    padding: "12px",
    display: "grid",
    "background-color": "black",
    "grid-template-columns": `${colWidth} ${colWidth}`,
    "grid-template-rows": `${rowHeight} ${rowHeight}`,
  },
  button: {
    "background-color": "#FFFFFF33",
    "border-radius": 16,
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    "grid-child": true,
    "align-self": "stretch",
    "justify-self": "stretch"
  },
  buttonContent: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center",
    gap: 8,
  },
  buttonText: {
    "text-color": "white",
    "font-size": 16,
  },
  focused: {
    "background-color": "#4660FF",
    "border-radius": 16,
  },
  image: {
    width: 'auto',
    height: 'auto',
  },
});
