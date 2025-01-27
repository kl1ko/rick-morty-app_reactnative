import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "./store";

export const CharacterDetail = ({ route, navigation }) => {
  const { characterId } = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isBrightTheme = useSelector((state) => state.theme.isDarkTheme);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch character details");
        }
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  if (loading) {
    return <ActivityIndicator size="large" color="0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error: {error}</Text>;
  }

  const handleSettingsPress = () => {
    console.log(navigation.navigate("Settings"));
  };

  const handleCreaturesPress = () => {
    console.log(navigation.navigate("Creatures"));
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isBrightTheme ? "white" : colors.darkblue },
      ]}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: isBrightTheme ? colors.gray : colors.midblue },
        ]}
      >
        <View style={styles.cardImageWrapper}>
          <Image source={{ uri: character.image }} style={styles.image} />
        </View>

        <Text style={styles.name}>{character.name}</Text>
        <Text style={styles.detail}>Status: {character.status}</Text>
        <Text style={styles.detail}>Species: {character.species}</Text>
        <Text style={styles.detail}>Gender: {character.gender}</Text>
        <Text style={styles.detail}>Origin: {character.origin.name}</Text>
        <Text style={styles.detail}>Location: {character.location.name}</Text>
        <Text style={styles.detail}>Episodes: {character.episode.length}</Text>
      </View>
      <Footer
        onSettingsPress={handleSettingsPress}
        onCreaturesPress={handleCreaturesPress}
      />
    </View>
  );
};

const Footer = ({ onSettingsPress, onCreaturesPress }) => {
  const isBrightTheme = useSelector((state) => state.theme.isDarkTheme);
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        onPress={onCreaturesPress}
        style={[
          styles.button,
          {
            backgroundColor: isBrightTheme ? colors.gray : colors.midblue,
          },
        ]}
      >
        <Text style={styles.buttonText}>Creatures</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onSettingsPress}
        style={[
          styles.button,
          {
            backgroundColor: isBrightTheme ? colors.gray : colors.midblue,
          },
        ]}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    marginBottom: 8,
    gap: 16,
    display: "flex",
    width: 350,
    height: 600,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // или 'space-between', 'center' в зависимости от ваших предпочтений
    padding: 10,
    width: 366,
    paddingTop: 32,
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
    elevation: 5, // Эффект поднятия для Android
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
