import React from "react";
import { View, Switch, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./themeSlice";

import { colors } from "./store";

export const Settings = ({ navigation }) => {
  const isBrightTheme = useSelector((state) => state.theme.isDarkTheme);
  const dispatch = useDispatch();

  const handleCreaturesPress = () => {
    console.log(navigation.navigate("Creatures"));
  };

  const Footer = ({ onCreaturesPress }) => {
    return (
      <View>
        <TouchableOpacity
          onPress={onCreaturesPress}
          style={[
            styles.footerContainer,
            styles.button,
            { backgroundColor: isBrightTheme ? colors.gray : colors.midblue },
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              { color: isBrightTheme ? "white" : "white" },
            ]}
          >
            Creatures
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isBrightTheme ? "white" : colors.darkblue },
      ]}
    >
      <Text style={[styles.text, { color: isBrightTheme ? "#000" : "#fff" }]}>
        Dark theme / Bright theme
      </Text>
      <Switch
        value={isBrightTheme}
        onValueChange={() => dispatch(toggleTheme())}
        trackColor={{ false: colors.gray, true: colors.gray }}
        thumbColor={isBrightTheme ? colors.blue : colors.blue}
      />
      <Footer onCreaturesPress={handleCreaturesPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: "center",
  },
  footerContainer: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.darkblue,
    borderTopColor: "#ddd",
    top: 300,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    borderRadius: 16,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
