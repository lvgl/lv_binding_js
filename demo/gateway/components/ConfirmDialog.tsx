import React from "react";
import { Button, Text, View, Dimensions, CreateStyle } from "lvgljs-ui";

const { width, height } = Dimensions.window;

interface ConfirmDialogProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  title,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}: ConfirmDialogProps) {
  return (
    <View style={style.overlay} onCancel={onCancel}>
      <View style={style.dialog}>
        <Text style={style.title}>{title}</Text>
        <View style={style.buttons}>
          <Button
            autoFocus
            style={style.button}
            onFocusedStyle={style.buttonFocused}
            onClick={onCancel}
            addToFocusGroup
          >
            <Text style={style.buttonText}>✕</Text>
          </Button>
          <Button
            style={style.button}
            onFocusedStyle={style.buttonFocused}
            onClick={onConfirm}
            addToFocusGroup
          >
            <Text style={style.buttonText}>✓</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

const style = CreateStyle({
  overlay: {
    position: "absolute",
    width,
    height,
    "background-color": "rgba(0, 0, 0, 0.7)",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
    zIndex: 1000,
  },
  dialog: {
    width: width - 80,
    "background-color": "black",
    "border-radius": 12,
    padding: 24,
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
  },
  title: {
    "text-color": "white",
    "font-size": 16,
    "text-align": "center",
    "margin-bottom": 24,
  },
  buttons: {
    display: "flex",
    "flex-direction": "row",
    "justify-content": "space-between",
    width: "100%",
    gap: 16,
  },
  button: {
    flex: 1,
    height: 44,
    "border-radius": 8,
    "background-color": "0x404040",
    display: "flex",
    "align-items": "center",
    "justify-content": "center",
  },
  buttonText: {
    "text-color": "white",
    "font-size": 18,
  },
  buttonFocused: {
    "border-width": 3,
    "border-color": "#4660FF",
  },
});
