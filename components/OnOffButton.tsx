import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const WEBSOCKET_ENDPOINT = "ws://192.168.1.41:81/";

const OnOffButton: React.FC<{}> = () => {
  const ws = useRef(new WebSocket(WEBSOCKET_ENDPOINT, ["arduino"])).current;

  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
      ws.send("Hello");
    };

    ws.onmessage = (e) => {
      console.log(e);
    };

    ws.onerror = (e) => {
      console.log(e);
    };

    ws.onclose = (e) => {
      console.log(e.code, e.reason);
    };
  }, []);

  const handlePress = () => {
    console.log("Pressed");
    ws.send("#");
  };

  return (
    <Pressable style={styles.component} onPress={handlePress}>
      <Text style={styles.text}>ON/OFF</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  component: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignContent: "center",
    padding: 32,
    borderRadius: 6,
  },
  text: {
    color: "white",
  },
});

export default OnOffButton;
