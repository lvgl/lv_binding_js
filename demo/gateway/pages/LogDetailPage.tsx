import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, Text, useFocusGroupEdge, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";

const { width, height } = Dimensions.window;

const TOTAL_ITEMS = 10;
function loopIndex(index: number) {
  if (index < 0) {
    return TOTAL_ITEMS - 1;
  }
  if (index >= TOTAL_ITEMS) {
    return 0;
  }
  return index;
}

export function LogDetailPage() {
  const t = useT();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const allLogDetails = useMemo(() => {
    return Array.from({ length: TOTAL_ITEMS }).map((_, i) => ({
      id: i + 1,
      content: `Log entry ${i + 1}, now I am focused, and change index by focus group edge event`,
    }));
  }, []);

  useFocusGroupEdge({
    onEdge: (edgeDirection) => {
      const result = loopIndex(currentIndex + (edgeDirection === "next" ? 1 : -1));
      setCurrentIndex(result);
    }
  });  

  return (
    <View style={style.pageRoot} onCancel={() => navigate(-1)}>
      <Header title={t("logs.detail")} />
      <View
        autoFocus
        addToFocusGroup
        style={style.logItem}
      >
        <Text style={style.logText}>{allLogDetails[currentIndex]?.content ?? ""}</Text>
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
  logItem: {
    width: "100%",
    "min-height": 60,
    "border-radius": 10,
    "background-color": "0x2a2a2a",
    margin: "0 0 8px 0",
    padding: "12px 16px",
    display: "flex",
    "align-items": "flex-start",
    "justify-content": "flex-start",
    "scroll-on-focus": 1,
  },
  logText: {
    "text-color": "white",
    "font-size": 14,
  },
  focused: {
    "border-radius": 10,
    margin: "0 0 8px 0",
    padding: "12px 16px",
    "background-color": "#4660FF",
  },
});
