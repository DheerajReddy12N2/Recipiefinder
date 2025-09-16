import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface FavoritesState {
  items: Recipe[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<Recipe[]>) => {
      state.items = action.payload;
    },
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      const exists = state.items.find((r) => r.idMeal === action.payload.idMeal);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((r) => r.idMeal !== action.payload);
    },
  },
});

export const { setFavorites, addFavorite, removeFavorite } = favoritesSlice.actions;

export const saveFavoritesToStorage =
  (items: Recipe[]) => async (dispatch: any) => {
    await AsyncStorage.setItem('favorites', JSON.stringify(items));
    dispatch(setFavorites(items));
  };

export const loadFavoritesFromStorage = () => async (dispatch: any) => {
  const stored = await AsyncStorage.getItem('favorites');
  if (stored) {
    dispatch(setFavorites(JSON.parse(stored)));
  }
};

export default favoritesSlice.reducer;
