import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const Footer = ({ onSettingsPress }) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={onSettingsPress}>
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a192f",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Footer;
