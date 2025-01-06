import React, { createContext, useContext, useState, useEffect } from 'react';
import { RootData, Category } from '../models/types';
import { fetchData, loadFavorites, saveFavorites, cleanupFavorites } from '../api/dataService';

interface DataContextType {
  data: RootData | null;
  loading: boolean;
  error: string | null;
  favorites: Record<string, boolean>;
  toggleFavorite: (appreciationId: string) => void;
  getCategoryById: (id: string) => Category | undefined;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<RootData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  // Chargement initial des données
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const response = await fetchData();
        if (response.error) {
          throw new Error(response.error);
        }
        setData(response.data);
        
        // Chargement des favoris depuis le localStorage
        const savedFavorites = loadFavorites();
        setFavorites(savedFavorites);
        
        // Nettoyage des favoris invalides
        cleanupFavorites(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Gestion des favoris
  const toggleFavorite = (appreciationId: string) => {
    const newFavorites = {
      ...favorites,
      [appreciationId]: !favorites[appreciationId]
    };
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  // Fonction utilitaire pour récupérer une catégorie par son ID
  const getCategoryById = (id: string): Category | undefined => {
    return data?.categories.find(category => category.id === id);
  };

  const value = {
    data,
    loading,
    error,
    favorites,
    toggleFavorite,
    getCategoryById
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};