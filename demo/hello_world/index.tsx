import { Button, Render, Text, View } from "lvgljs-ui";
import React, { useState } from "react";

function App() {
  const [text, setText] = useState("text");
  return (
    <View style={{ "background-color": "blue" }}>
      <Button style={{ "background-color": "red" }} onClick={() => setText("text2")}>
        <Text>{text}</Text>
      </Button>
    </View>
  );
}

Render.render(<App />);
