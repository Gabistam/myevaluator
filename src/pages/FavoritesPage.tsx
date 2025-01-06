import React, { useMemo } from 'react';
import { useData } from '../contexts/DataContext';
import { AppreciationList } from '../components/AppreciationList';
import { Appreciation } from '../models/types';

export const FavoritesPage: React.FC = () => {
  const { data, favorites, loading, error } = useData();

  // Nous utilisons useMemo pour éviter de recalculer la liste des favoris à chaque rendu
  const favoriteAppreciations = useMemo(() => {
    if (!data) return [];
    
    // Parcourons toutes les catégories pour trouver les appréciations favorites
    const allFavorites: Appreciation[] = data.categories.flatMap(category =>
      category.appreciations.filter(appreciation => 
        favorites[appreciation.id]
      )
    );

    // Trions les favoris par niveau pour une meilleure organisation
    return allFavorites.sort((a, b) => {
      const levels = [
        'Exceptionnel', 'Excellent', 'Très bon', 'Bon', 'Satisfaisant',
        'Passable', 'Médiocre', 'Faible', 'Insuffisant', 'Très insuffisant'
      ];
      return levels.indexOf(a.level) - levels.indexOf(b.level);
    });
  }, [data, favorites]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-primary">Chargement de vos favoris...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Une erreur est survenue : {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-100">Mes Favoris</h1>
        <span className="text-gray-400">
          {favoriteAppreciations.length} {favoriteAppreciations.length > 1 ? 'appréciations' : 'appréciation'}
        </span>
      </div>

      {favoriteAppreciations.length === 0 ? (
        <div className="text-center py-12 bg-background-light rounded-lg">
          <p className="text-gray-400">
            Vous n'avez pas encore d'appréciations favorites.
          </p>
          <p className="text-gray-500 mt-2">
            Cliquez sur l'étoile ⭐ à côté d'une appréciation pour l'ajouter à vos favoris.
          </p>
        </div>
      ) : (
        <AppreciationList appreciations={favoriteAppreciations} />
      )}
    </div>
  );
};