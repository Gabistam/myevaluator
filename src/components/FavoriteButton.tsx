import React from 'react';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onClick: () => void;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onClick,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        transform transition-all duration-300
        ${isFavorite ? 'scale-110' : 'scale-100'}
        hover:scale-125
        ${className}
      `}
      aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <span className={`
        text-2xl
        ${isFavorite ? 'text-yellow-300' : 'text-gray-400'}
        transition-colors duration-300
      `}>
        ⭐
      </span>
    </button>
  );
};