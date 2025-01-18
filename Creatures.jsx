import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

export const Creature = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("all"); // Default filter

  const fetchCharacters = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${pageNumber}`
      );
      const data = await response.json();
      const newCharacters = data.results.slice(0, 20);

      // Проверка на дубликаты
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
      return <ActivityIndicator size="large" color="0000ff" />;
    }
    return (
      <TouchableOpacity
        style={styles.loadMoreButton}
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
        return "gray";
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
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <View style={styles.cardDescription}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Status: {item.status}</Text>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: getStatusColor(item.status) },
            ]}
          />
        </View>
        <Text style={styles.species}>Species: {item.species}</Text>
      </View>
    </View>
  );

  const [textColor, setTextColor] = useState("white");

  return (
    <>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <Text
            style={{
              color: textColor,

              fontSize: 16,
              color: "#fff",
              backgroundColor: "#007bff",
              width: 150,
              paddingVertical: 4,
              borderRadius: 10,
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Filter by status
          </Text>
          <View style={styles.picker}>
            <TouchableOpacity onPress={() => handleFilterChange("all")}>
              <Text
                style={[
                  filter === "all" ? styles.selectedFilter : styles.filterText,
                  { color: textColor }, // Добавляем цвет текста
                ]}
              >
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange("Alive")}>
              <Text
                style={[
                  filter === "Alive"
                    ? styles.selectedFilter
                    : styles.filterText,
                  { color: textColor },
                ]}
              >
                Alive
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange("Dead")}>
              <Text
                style={[
                  filter === "Dead" ? styles.selectedFilter : styles.filterText,
                  { color: textColor },
                ]}
              >
                Dead
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleFilterChange("unknown")}>
              <Text
                style={[
                  filter === "unknown"
                    ? styles.selectedFilter
                    : styles.filterText,
                  { color: textColor },
                ]}
              >
                Unknown
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={filteredCharacters}
          // data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a192f",
    padding: 4,
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,

    paddingHorizontal: 100,
    paddingVertical: 8,
    flexDirection: "row",
    flexWrap: "wrap",

    width: "100%",
  },

  card: {
    marginBottom: 8,
    gap: 16,
    display: "flex",
    width: 350,
    height: 200,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(23, 42, 69, 0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "row",
    alignItems: "center",

    padding: 16,
  },
  cardHover: {
    backgroundColor: "rgba(47, 85, 137, 0.8)",
  },
  cardTitle: {
    color: "white",
  },
  cardImageWrapper: {
    flex: 1,
    height: "100%",
  },
  cardImage: {
    flex: 1,
    resizeMode: "cover",
    borderWidth: 1,
    width: "100px",
    height: "100%",
  },
  cardDescription: {
    flex: 1,
    marginRight: 8,
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
    backgroundColor: "rgba(23, 42, 69, 0.8)",
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
    backgroundColor: "rgba(47, 85, 137, 0.8)",
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
    padding: 20,
  },
  filterText: {
    fontSize: 16,
    color: "#333",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    textAlign: "center",
  },
  selectedFilter: {
    fontSize: 16,
    color: "#fff",
    backgroundColor: "rgba(23, 42, 69, 0.8)",
    width: 150,

    paddingVertical: 4,
    borderRadius: 10,
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
    elevation: 5, // Эффект поднятия для Android
  },
  loadMoreText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
