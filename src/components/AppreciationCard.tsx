// src/components/AppreciationCard.tsx
import React from 'react';
import { Appreciation } from '../models/types';

interface AppreciationCardProps {
  appreciation: Appreciation;
  onToggleFavorite: (id: string) => void;
  onCopyComment: (comment: string) => void;
}

export const AppreciationCard: React.FC<AppreciationCardProps> = ({
  appreciation,
  onToggleFavorite,
  onCopyComment,
}) => {
  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold">{appreciation.level}</h3>
          <p className="mt-2">{appreciation.comment}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onCopyComment(appreciation.comment)}
            className="btn-primary"
            title="Copier"
          >
            📋
          </button>
          <button
            onClick={() => onToggleFavorite(appreciation.id)}
            className={`btn-primary ${appreciation.isFavorite ? 'text-yellow-300' : ''}`}
            title={appreciation.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            ⭐
          </button>
        </div>
      </div>
    </div>
  );
};