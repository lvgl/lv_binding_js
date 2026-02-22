import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateStyle, Dimensions, useT, View } from "lvgljs-ui";
import { Header } from "../components/Header";
import { ConfirmDialog } from "../components/ConfirmDialog";

const { width, height } = Dimensions.window;

export function ClearLogsPage() {
  const t = useT();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(true);

  const handleConfirm = () => {
    // Perform clear logs action
    setShowDialog(false);
    navigate(-1);
  };

  const handleCancel = () => {
    setShowDialog(false);
    navigate(-1);
  };

  return (
    <View style={style.pageRoot} onCancel={handleCancel}>
      <Header title={t("clearLogs.title")} backIcon={"./demo/gateway/assets/nav_icon/clear_logs.png"} />
      {showDialog && (
        <ConfirmDialog
          title={t("clearLogs.confirm")}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          confirmText={t("clearLogs.confirmBtn")}
          cancelText={t("clearLogs.cancel")}
        />
      )}
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
});
