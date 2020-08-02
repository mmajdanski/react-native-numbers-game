import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props: any) {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 20,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});
