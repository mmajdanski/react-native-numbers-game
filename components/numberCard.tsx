import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

interface Props {
  enteredValue: number;
  onStartGame: (selectedNumber: number) => void;
}

export default function NumberCard(props: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={{ margin: 20 }}>
          <Text style={styles.cardHeader}>Your number is:</Text>
          <Text style={styles.number}>{props.enteredValue}</Text>
        </View>
        <TouchableOpacity onPress={() => props.onStartGame(props.enteredValue)}>
          <View style={styles.bottomButton}>
            <Text style={styles.bottomButtonText}>START GAME</Text>
            {/* <Button title="Start Game" onPress={() => {}}></Button> */}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#fff",

    //borderWidth: 1,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowOffset: { width: 10, height: 0 },
    shadowRadius: 30,
    elevation: 40,
  },
  cardHeader: { paddingBottom: 5, fontSize: 28 },
  number: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomButton: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    backgroundColor: "#22B07D",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bottomButtonText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
});
