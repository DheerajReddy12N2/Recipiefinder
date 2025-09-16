import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Button, Linking } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { saveFavoritesToStorage } from "../redux/favoritesSlice";

const RecipeDetailsScreen = ({ route }: any) => {
  const { meal } = route.params;
  const favorites = useSelector((state: RootState) => state.favorites.items);
  const dispatch = useDispatch();

  const isFavorite = favorites.some((r) => r.idMeal === meal.idMeal);

  const handleToggleFavorite = () => {
    let updated;
    if (isFavorite) {
      updated = favorites.filter((r) => r.idMeal !== meal.idMeal);
    } else {
      updated = [...favorites, meal];
    }
    dispatch<any>(saveFavoritesToStorage(updated));
  };

  // Extract ingredients + measures
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${measure?.trim() || ""} ${ingredient.trim()}`);
    }
  }

  // Split instructions into steps
  const steps = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n|\. /)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 0)
    : [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image */}
      <Image source={{ uri: meal.strMealThumb }} style={styles.image} />

      {/* Title */}
      <Text style={styles.title}>{meal.strMeal}</Text>

      {/* Recipe Details */}
      <Text style={styles.sectionTitle}>📌 Recipe Details:</Text>
      <View style={styles.detailsBox}>
        <Text style={styles.detailText}>🍴 Category: {meal.strCategory}</Text>
        <Text style={styles.detailText}>🌍 Area: {meal.strArea}</Text>
        {meal.strTags ? <Text style={styles.detailText}>🏷️ Tags: {meal.strTags}</Text> : null}
        {meal.strYoutube ? (
          <Text
            style={[styles.detailText, styles.link]}
            onPress={() => Linking.openURL(meal.strYoutube)}
          >
            ▶️ Watch on YouTube
          </Text>
        ) : null}
      </View>

      {/* Ingredients Section */}
      <Text style={styles.sectionTitle}>🛒 Ingredients:</Text>
      {ingredients.map((item, index) => (
        <View key={index} style={styles.ingredientContainer}>
          <Text style={styles.ingredientText}>• {item}</Text>
        </View>
      ))}

      {/* Steps Section */}
      <Text style={styles.sectionTitle}>🥘 Steps to Cook:</Text>
      {steps.map((step: string, index: number) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepNumber}>Step {index + 1}</Text>
          <Text style={styles.stepText}>{step}</Text>
        </View>
      ))}

      {/* Add/Remove Button */}
      <View style={styles.buttonContainer}>
        <Button
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          onPress={handleToggleFavorite}
          color={isFavorite ? "red" : "green"}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15 },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 15 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },

  // Recipe Details Box
  detailsBox: {
    backgroundColor: "#f2f2f2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailText: { fontSize: 15, marginBottom: 6 },
  link: { color: "blue", textDecorationLine: "underline" },

  // Section Titles
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },

  // Ingredients
  ingredientContainer: {
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  ingredientText: { fontSize: 15, lineHeight: 20 },

  // Steps
  stepContainer: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ff6347",
  },
  stepNumber: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  stepText: { fontSize: 14, lineHeight: 20 },

  // Button
  buttonContainer: { marginTop: 20, marginBottom: 30 },
});

export default RecipeDetailsScreen;
