import React from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite, saveFavoritesToStorage } from "../redux/favoritesSlice";
import { RootState } from "../redux/store";

const FavoritesScreen = ({ navigation }: any) => {
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    const updated = favorites.filter((r) => r.idMeal !== id);
    dispatch<any>(saveFavoritesToStorage(updated));
    dispatch(removeFavorite(id));
  };

  const renderFavorite = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RecipeDetails", { meal: item })}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.strMealThumb }} style={styles.image} />

      {/* Heart icon (always red here) */}
      <TouchableOpacity
        style={styles.heartIcon}
        onPress={() => handleRemove(item.idMeal)}
      >
        <Icon name="heart" size={26} color="red" />
      </TouchableOpacity>

      <Text style={styles.mealName}>{item.strMeal}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.idMeal}
          renderItem={renderFavorite}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
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
  emptyText: {
    textAlign: "center",
    marginTop: 30,
    fontSize: 16,
    color: "gray",
  },
});
