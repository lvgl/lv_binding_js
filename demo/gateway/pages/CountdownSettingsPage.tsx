import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Arc, CreateStyle, Dimensions, Text, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

export function CountdownSettingsPage() {
  const t = useT();
  const navigate = useNavigate();
  const total = 60;
  const [remain, setRemain] = useState(total);

  useEffect(() => {
    setRemain(total);
    const timer = setInterval(() => {
      setRemain((r) => (r <= 0 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const elapsed = total - remain;
  const angle = Math.floor((1 - elapsed / total) * 360);

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("countdown.title")} />

      <View style={style.centerContent} addToFocusGroup>
        <Arc
          style={style.arc}
          indicatorStyle={style.arcIndicator}
          knobStyle={style.arcKnobHidden}
          range={[0, total]}
          value={elapsed}
          rotation={270}
          backgroundStartAngle={360}
          backgroundEndAngle={0}
          startAngle={360}
          endAngle={angle}
          mode="normal"
          changeRate={360}
          onChange={() => {
            // keep non-interactive for this demo
          }}
        />
        <Text style={style.bigText}>{t("countdown.time", { remain })}</Text>
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
  centerContent: {
    width,
    height: height - 52,
    display: "flex",
    "flex-direction": "column",
    "justify-content": "center",
    "align-items": "center",
  },
  arc: {
    width: 220,
    height: 220,
    "arc-width": 18,
    "arc-color": "#2E2E2E",
    "arc-rounded": true,
    "background-color": "black",
  },
  arcIndicator: {
    "arc-width": 18,
    "arc-color": "white",
    "arc-rounded": true,
  },
  arcKnobHidden: {
    width: 1,
    height: 1,
    opacity: 0,
  },
  bigText: {
    "text-color": "white",
    "font-size": 26,
    "padding-top": 20,
  },
});
