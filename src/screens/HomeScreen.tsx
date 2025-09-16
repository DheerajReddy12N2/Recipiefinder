import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../redux/favoritesSlice";
import { RootState } from "../redux/store";

const HomeScreen = ({ navigation }: any) => {
  const [search, setSearch] = useState("");
  const [randomMeal, setRandomMeal] = useState<any>(null);
  const [meals, setMeals] = useState<any[]>([]);
  const [initialMeals, setInitialMeals] = useState<any[]>([]);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  // Fetch Surprise Me (random meal)
  const fetchRandomMeal = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );
      setRandomMeal(response.data.meals[0]);
    } catch (error) {
      console.error("Error fetching random meal:", error);
    }
  };

  // Fetch default meals to fill page
  const fetchMeals = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s="
      );
      setMeals(response.data.meals || []);
      setInitialMeals(response.data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Search meals
  const handleSearch = async () => {
    if (!search.trim()) {
      setMeals(initialMeals);
      return;
    }
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
      );
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error("Error searching meals:", error);
    }
  };

  useEffect(() => {
    fetchRandomMeal();
    fetchMeals();
  }, []);

  // Toggle favorite
  const toggleFavorite = (meal: any) => {
    const exists = favorites.find((fav: any) => fav.idMeal === meal.idMeal);
    if (exists) {
      dispatch(removeFavorite(meal.idMeal));
    } else {
      dispatch(addFavorite(meal));
    }
  };

  const renderMeal = ({ item }: any) => {
    const isFavorite = favorites.some((fav: any) => fav.idMeal === item.idMeal);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("RecipeDetails", { meal: item })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.strMealThumb }} style={styles.image} />

        {/* Heart icon */}
        <TouchableOpacity
          style={styles.heartIcon}
          onPress={() => toggleFavorite(item)}
        >
          <Icon
            name={isFavorite ? "heart" : "heart-outline"}
            size={26}
            color={isFavorite ? "red" : "white"}
          />
        </TouchableOpacity>

        <Text style={styles.mealName}>{item.strMeal}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for meals..."
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <Icon name="search" size={22} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Surprise Me Section */}
        {randomMeal && (
          <TouchableOpacity
            style={styles.surpriseCard}
            onPress={() =>
              navigation.navigate("RecipeDetails", { meal: randomMeal })
            }
          >
            <Image
              source={{ uri: randomMeal.strMealThumb }}
              style={styles.image}
            />
            <Text style={styles.surpriseText}>
              🎉 Surprise Me: {randomMeal.strMeal}
            </Text>
          </TouchableOpacity>
        )}

        {/* Meals List */}
        <FlatList
          data={meals}
          renderItem={renderMeal}
          keyExtractor={(item) => item.idMeal}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    paddingTop: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    height: 45,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    marginRight: 8,
  },
  surpriseCard: {
    backgroundColor: "#ffe4b5",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  surpriseText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fafafa",
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
  },
  heartIcon: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
    padding: 5,
  },
  mealName: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  list: {
    paddingBottom: 50,
  },
});