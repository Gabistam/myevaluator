// src/components/AppreciationList.tsx
import React from 'react';
import { Appreciation } from '../models/types';
import { AppreciationCard } from './AppreciationCard';
import { useData } from '../contexts/DataContext';

interface AppreciationListProps {
  appreciations: Appreciation[];
}

export const AppreciationList: React.FC<AppreciationListProps> = ({ 
  appreciations 
}) => {
  // Nous n'avons plus besoin de gérer l'état du toast ici car il est géré dans AppreciationCard
  const { toggleFavorite } = useData();

  return (
    <div className="space-y-6">
      {appreciations.map((appreciation) => (
        <AppreciationCard
          key={appreciation.id}
          appreciation={appreciation}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
};