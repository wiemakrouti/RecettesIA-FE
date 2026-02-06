import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Analyse une image et génère des recettes
 */
export async function analyzeImage(imageFile, filters = {}) {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('filters', JSON.stringify(filters));

  const response = await api.post('/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
}

/**
 * Régénère des recettes avec des ingrédients spécifiques
 */
export async function refineRecipes(ingredients, filters = {}) {
  const response = await api.post('/recipes/refine', {
    ingredients,
    filters,
  });

  return response.data;
}

/**
 * Vérifie l'état de l'API
 */
export async function checkHealth() {
  const response = await api.get('/health');
  return response.data;
}

export default api;
