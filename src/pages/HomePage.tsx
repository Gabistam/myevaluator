import React from 'react';
import { CategoryList } from '../components/CategoryList';
import { useData } from '../contexts/DataContext';

export const HomePage: React.FC = () => {
  const { data, loading, error } = useData();

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

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-100">
        Catégories d'évaluation
      </h1>
      
      {data && <CategoryList categories={data.categories} />}
    </div>
  );
};