import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CategoryPage } from '../pages/CategoryPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { Layout } from '../components/Layout';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      {/* Nous utilisons un Layout comme composant parent pour maintenir une structure cohérente */}
      <Route element={<Layout />}>
        {/* La route racine affiche la page d'accueil */}
        <Route path="/" element={<HomePage />} />
        
        {/* Route pour afficher une catégorie spécifique avec son ID */}
        <Route path="/category/:id" element={<CategoryPage />} />
        
        {/* Route pour la page des favoris */}
        <Route path="/favorites" element={<FavoritesPage />} />
        
        {/* Redirection vers la page d'accueil pour toute route non trouvée */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};