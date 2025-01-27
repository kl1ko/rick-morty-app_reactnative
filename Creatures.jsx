import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

import { useSelector, useDispatch } from "react-redux";
import { colors } from "./store";

export const Creature = ({ navigation }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const isBrightTheme = useSelector((state) => state.theme.isDarkTheme);

  const fetchCharacters = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const data = await response.json();
      const newCharacters = data.results.slice(0, 20);

      setCharacters((prevCharacters) => {
        const existingIds = new Set(prevCharacters.map((char) => char.id));
        const uniqueNewCharacters = newCharacters.filter(
          (char) => !existingIds.has(char.id)
        );
        return [...prevCharacters, ...uniqueNewCharacters];
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(page);
  }, [page]);

  const loadMoreCharacters = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator size="small" color="#0000ff" />;
    }
    return (
      <TouchableOpacity
        style={[
          styles.loadMoreButton,
          {
            backgroundColor: isBrightTheme ? colors.gray : colors.blue,
          },
        ]}
        onPress={loadMoreCharacters}
      >
        <Text style={styles.loadMoreText}>Load more</Text>
      </TouchableOpacity>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      case "unknown":
        return isBrightTheme ? "white" : colors.gray;
      default:
        return "black";
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredCharacters = characters.filter((character) => {
    if (filter === "all") {
      return true;
    }
    return character.status.toLowerCase() === filter.toLowerCase();
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("CharacterDetail", { characterId: item.id });
      }}
    >
      <View
        style={[
          styles.card,
          { backgroundColor: isBrightTheme ? colors.gray : colors.midblue },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardDescription}>
          <Text
            style={[
              styles.cardTitle,
              { color: isBrightTheme ? "black" : "white" },
            ]}
          >
            {item.name}
          </Text>
          <View style={styles.statusContainer}>
            <Text
              style={[
                styles.status,
                { color: isBrightTheme ? "black" : "white" },
              ]}
            >
              Status: {item.status}
            </Text>
            <View
              style={[
                styles.statusDot,
                { backgroundColor: getStatusColor(item.status) },
              ]}
            />
          </View>
          <Text
            style={[
              styles.species,
              { color: isBrightTheme ? "black" : "white" },
            ]}
          >
            Species: {item.species}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSettingsPress = () => {
    console.log(navigation.navigate("Settings"));
  };

  return (
    <>
      <View
        style={[
          styles.container,
          { backgroundColor: isBrightTheme ? "white" : colors.darkblue },
        ]}
      >
        <View style={styles.filterContainer}>
          <Text
            style={[
              { fontSize: 16 },
              { color: "#fff" },
              { backgroundColor: isBrightTheme ? colors.gray : colors.midblue },
              { width: 150 },
              { paddingVertical: 4 },
              { borderRadius: 10 },
              { textAlign: "center" },
              { marginBottom: 8 },
              { color: isBrightTheme ? "black" : "white" },
            ]}
          >
            Filter by status
          </Text>
          <View
            style={[styles.picker, { flexDirection: "row", flexWrap: "wrap" }]}
          >
            <TouchableOpacity onPress={() => handleFilterChange("all")}>
              <Text
                style={[
                  filter === "all"
                    ? {
                        backgroundColor: isBrightTheme
                          ? colors.gray
                          : colors.midblue,
                        fontSize: 16,
                        width: 125,
                        paddingVertical: 4,
                        borderRadius: 10,
                        textAlign: "center",
                      }
                    : styles.filterText,
                  { color: isBrightTheme ? "black" : "white" },
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange("Alive")}>
              <Text
                style={[
                  filter === "Alive"
                    ? {
                        backgroundColor: isBrightTheme
                          ? colors.gray
                          : colors.midblue,
                        fontSize: 16,
                        width: 125,
                        paddingVertical: 4,
                        borderRadius: 10,
                        textAlign: "center",
                      }
                    : styles.filterText,
                  { color: isBrightTheme ? "black" : "white" },
                  ,
                ]}
              >
                Alive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange("Dead")}>
              <Text
                style={[
                  filter === "Dead"
                    ? {
                        backgroundColor: isBrightTheme
                          ? colors.gray
                          : colors.midblue,
                        fontSize: 16,
                        width: 125,
                        paddingVertical: 4,
                        borderRadius: 10,
                        textAlign: "center",
                      }
                    : styles.filterText,
                  { color: isBrightTheme ? "black" : "white" },
                ]}
              >
                Dead
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange("unknown")}>
              <Text
                style={[
                  filter === "unknown"
                    ? {
                        backgroundColor: isBrightTheme
                          ? colors.gray
                          : colors.midblue,
                        fontSize: 16,
                        width: 125,
                        paddingVertical: 4,
                        borderRadius: 10,
                        textAlign: "center",
                      }
                    : styles.filterText,
                  { color: isBrightTheme ? "black" : "white" },
                ]}
              >
                Unknown
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={filteredCharacters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={renderFooter}
        />
        <Footer onSettingsPress={handleSettingsPress} />
      </View>
    </>
  );
};

const Footer = ({ onSettingsPress }) => {
  const isBrightTheme = useSelector((state) => state.theme.isDarkTheme);
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          {
            backgroundColor: isBrightTheme ? colors.gray : colors.midblue,
          },
        ]}
        onPress={onSettingsPress}
      >
        <Text
          style={[
            styles.buttonText,
            {
              color: "white",
            },
          ]}
        >
          Settings
        </Text>
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
    justifyContent: "space-between",
  },
  wrapper: {
    flex: 1,

    paddingHorizontal: 100,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    overflow: "hidden",
  },

  card: {
    marginBottom: 8,
    display: "flex",
    width: 350,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",

    padding: 16,
  },
  cardImage: {
    flex: 1,
    // resizeMode: "cover",
    borderWidth: 1,
    width: "100px",
    height: "100%",
    marginTop: 6,
  },
  cardDescription: {
    flex: 1,
    marginLeft: 8,
  },
  title: {
    fontSize: 25,
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "#ffffff",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  button: {
    padding: 15,
    paddingHorizontal: 30,
    fontSize: 16,
    color: "#ffffff",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonHover: {
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  status: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    color: "white",
  },
  species: { color: "white" },
  statusDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
  },
  statusAlive: {
    backgroundColor: "green",
  },
  statusDead: {
    backgroundColor: "red",
  },
  statusUnknown: {
    backgroundColor: "gray",
  },

  label: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#ffffff",
    marginRight: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    backgroundColor: "#1a1a2e",
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  mediaWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  mediaCard: {
    width: 350,
    height: 150,
  },
  mediaTitle: {
    fontSize: 18,
  },
  mediaText: {
    fontSize: 14,
  },
  filterContainer: {
    alignItems: "center",
    padding: 10,

    width: 500,
    justifyContent: "space-between",
  },
  filterText: {
    fontSize: 16,

    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: "center",
  },
  loadMoreButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  loadMoreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  footerContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: "bold",
  },
  picker: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 10,
  },
});
