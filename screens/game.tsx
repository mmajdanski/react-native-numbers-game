import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Card from "../components/card";
import Colors from "../constants/colors";

interface Props {
  enteredValue: number;
}

const guessValue = (min: number, max: number, excluded: number): number => {
  let min_value = Math.ceil(min);
  let max_value = Math.floor(max);
  let guess = Math.floor(Math.random() * (max_value - min_value)) + min_value;
  if (guess == excluded) {
    return guessValue(1, 100, excluded);
  }
  return guess;
};

export default function GameScreen(props: Props) {
  const [guessedValue, setGuessedValue] = useState(
    guessValue(1, 100, props.enteredValue)
  );

  return (
    <Card>
      <Text>Select a Number</Text>
      <Text>The computer guesses a value of {guessedValue}</Text>

      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Lower"
            onPress={() => {
              setGuessedValue(guessValue(1, guessedValue - 1, 0));
            }}
            color={Colors.accent}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="Higher"
            onPress={() => {
              setGuessedValue(guessValue(guessedValue + 1, 100, 0));
            }}
            color={Colors.primary}
          ></Button>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 20, marginVertical: 10 },
  inputContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    width: "40%",
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});
