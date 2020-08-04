import React, { useState, ElementType } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Button,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  Keyboard,
  Alert,
} from "react-native";
import Card from "../components/card";
import Colors from "../constants/colors";
import Input from "../components/input";
import NumberCard from "../components/numberCard";

interface Props {
  onStartGame: (selectedNumber: number) => void;
}

export default function StartGameScreen(props: Props) {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const numberInputHandler = (
    inputText: NativeSyntheticEvent<TextInputChangeEventData>
  ) => {
    let inputTextValue = inputText.nativeEvent.text;
    let regEx = new RegExp("^[0-9]*$"); // Only numbers
    if (regEx.test(inputTextValue)) {
      //If we are only dealing with numbers
      setEnteredValue(inputTextValue);
    }
    //If there are other values other than numbers, dont change
  };

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid Number",
        "Number has to be a number between 1 and 99",
        [
          {
            text: "Okay",
            style: "destructive",
            onPress: () => {
              setEnteredValue("");
            },
          },
        ]
      );
      setConfirmed(false);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
  };

  let confirmedOutput = <Text></Text>;

  if (confirmed) {
    confirmedOutput = (
      <NumberCard
        onStartGame={props.onStartGame}
        enteredValue={selectedNumber}
      />
    );
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input
            placeholder="9"
            style={styles.input}
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            onChange={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Reset"
                onPress={() => {
                  setEnteredValue("");
                  setConfirmed(false);
                }}
                color={Colors.accent}
              ></Button>
            </View>
            <View style={styles.button}>
              <Button
                title="Confirm"
                onPress={confirmInputHandler}
                color={Colors.primary}
              ></Button>
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, padding: 10, alignItems: "center" },
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
