import { ApiResponse, RootData } from '../models/types';

const FAVORITES_KEY = 'evaluator_favorites';

// Fonction pour charger les données JSON
export async function fetchData(): Promise<ApiResponse<RootData>> {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      data: { _id: '', categories: [] },
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Fonction pour sauvegarder les favoris
export function saveFavorites(favorites: Record<string, boolean>): void {
  try {
    const data = JSON.stringify(favorites);
    localStorage.setItem(FAVORITES_KEY, data);
    
    // Déclenchement d'un événement personnalisé pour la synchronisation entre onglets
    window.dispatchEvent(new CustomEvent('favorites-updated', {
      detail: favorites
    }));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des favoris:', error);
  }
}

// Fonction pour charger les favoris
export function loadFavorites(): Record<string, boolean> {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Erreur lors du chargement des favoris:', error);
    return {};
  }
}

// Fonction pour nettoyer les favoris invalides
export function cleanupFavorites(data: RootData): void {
  const favorites = loadFavorites();
  const validAppreciationIds = new Set(
    data.categories.flatMap(category => 
      category.appreciations.map(appreciation => appreciation.id)
    )
  );

  let hasChanges = false;
  const cleanedFavorites: Record<string, boolean> = {};

  for (const [id, value] of Object.entries(favorites)) {
    if (validAppreciationIds.has(id)) {
      cleanedFavorites[id] = value;
    } else {
      hasChanges = true;
    }
  }

  if (hasChanges) {
    saveFavorites(cleanedFavorites);
  }
}