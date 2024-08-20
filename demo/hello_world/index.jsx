import { Render, Text, View } from "lvgljs-ui";
import React from "react";

function App() {
  return (
    <View style={{ "background-color": "blue" }}>
      <Text>Hello World</Text>
    </View>
  );
}

Render.render(<App />);
