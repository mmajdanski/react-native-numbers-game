import React, { useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Card from "../components/card";
import Colors from "../constants/colors";

interface Props {
  enteredValue: number;
  resetGame: () => void;
}

export default function GameScreen(props: Props) {
  const guessValue = (
    min: number,
    max: number,
    excluded: number = 0
  ): number => {
    let min_value = Math.ceil(min);
    let max_value = Math.floor(max);
    let guess = Math.floor(Math.random() * (max_value - min_value)) + min_value;
    if (guess == excluded) {
      return guessValue(1, 100, excluded);
    }
    return guess;
  };

  const [guesses, setGuesses] = useState([
    guessValue(1, 100, props.enteredValue),
  ]);

  const [minGuessValue, setMinGuessValue] = useState(1);
  const [maxGuessValue, setMaxGuessValue] = useState(100);

  const latestesGuessValue = guesses[guesses.length - 1]; //Current Guess Value

  const interactiveContent = () => {
    if (guesses[guesses.length - 1] == props.enteredValue) {
      return (
        <View style={styles.buttonContainer}>
          <View style={styles.playAgainButton}>
            <Button
              title="Play Again!"
              onPress={props.resetGame}
              color={Colors.primary}
            ></Button>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Lower"
            onPress={() => {
              // console.log("Min guess:", minGuessValue);
              // console.log("Max guess (before change):", maxGuessValue);
              setMaxGuessValue(latestesGuessValue - 1);
              // console.log("Min guess:", minGuessValue);
              // console.log("Max guess (after change):", latestesGuessValue - 1);
              setGuesses([
                ...guesses,
                guessValue(minGuessValue, latestesGuessValue - 1),
              ]);
            }}
            color={Colors.accent}
          ></Button>
        </View>
        <View style={styles.button}>
          <Button
            title="Higher"
            onPress={() => {
              // console.log("Min guess (before change):", minGuessValue);
              // console.log("Max guess:", maxGuessValue);
              setMinGuessValue(latestesGuessValue + 1);
              // console.log("Min guess (after change):", latestesGuessValue + 1);
              // console.log("Max guess:", maxGuessValue);
              setGuesses([
                ...guesses,
                guessValue(latestesGuessValue + 1, maxGuessValue),
              ]);
            }}
            color={Colors.primary}
          ></Button>
        </View>
      </View>
    );
  };

  return (
    <Card style={{ flex: 1, justifyContent: "space-evenly" }}>
      <Text style={{ textAlign: "center", fontSize: 24 }}>
        The computer's guesses:
        {guesses.map((guess) => {
          return guess.toString() + "";
        })}
      </Text>
      <Text style={{ textAlign: "center", fontSize: 24 }}>
        The computer guesses a value of:
      </Text>
      <Text style={{ textAlign: "center", fontSize: 36 }}>
        {latestesGuessValue}
      </Text>
      {interactiveContent()}
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
  playAgainButton: {
    width: "100%",
    height: 20,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});
