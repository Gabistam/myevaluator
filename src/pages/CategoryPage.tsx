// src/pages/CategoryPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { AppreciationList } from '../components/AppreciationList';

export const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, loading, error } = useData();

  // Récupérer la catégorie correspondante à partir des données
  const category = data?.categories.find(cat => cat.id === id);

  // Gérer les différents états
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-primary">Chargement...</div>
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

  // Si la catégorie n'existe pas, rediriger vers la page d'accueil
  if (!category) {
    navigate('/');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-4xl" role="img" aria-label={category.name}>
            {category.image}
          </span>
          <h1 className="text-2xl font-bold">{category.name}</h1>
        </div>
        
        {/* Afficher la liste des appréciations */}
        <AppreciationList appreciations={category.appreciations} />
      </div>
    </div>
  );
};