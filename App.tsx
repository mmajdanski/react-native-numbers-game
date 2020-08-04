import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/header";
import StartGameScreen from "./screens/startGame";
import GameScreen from "./screens/game";

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState(0);

  const startGameHandler = (selectedNumber: number) => {
    setSelectedNumber(selectedNumber);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;
  if (selectedNumber > 0) {
    content = (
      <GameScreen
        enteredValue={selectedNumber}
        resetGame={() => startGameHandler(0)}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number"} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
});
