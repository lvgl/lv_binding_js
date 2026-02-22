import React from "react";
import { CreateStyle, Image, Text, View } from "lvgljs-ui";
import { useNavigate } from "react-router";

interface HeaderProps {
  title: string;
  backIcon?: string;
}

export function Header({ title, backIcon }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <View style={style.header}>
      <Image src="left" style={style.headerIcon} onClick={() => navigate(-1)} />
      {backIcon && <Image src={backIcon} style={style.headerIcon} />}
      <Text style={style.headerTitle}>{title}</Text>
    </View>
  );
}

const style = CreateStyle({
  header: {
    width: "100%",
    height: 52,
    display: "flex",
    "flex-direction": "row",
    "align-items": "center",
    "background-color": "0x202020",
    padding: "0 16px",
  },
  headerIcon: {
    width: 'auto',
    height: 'auto',
    "text-color": "white",
    "font-size": 18,
  },
  headerTitle: {
    "text-color": "white",
    "font-size": 16,
  },
});
