// src/components/AppreciationCard.tsx
import React, { useState } from 'react';
import { Appreciation } from '../models/types';
import { MoreVertical, Copy, Star, Edit, Trash2 } from 'lucide-react';

interface AppreciationCardProps {
  appreciation: Appreciation;
  onToggleFavorite: (id: string) => void;
}

export const AppreciationCard: React.FC<AppreciationCardProps> = ({
  appreciation
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Fonction pour copier le texte, utilisée à la fois par le clic sur la carte
  // et par le bouton du menu
  const handleCopy = async (e?: React.MouseEvent) => {
    // Si l'événement vient d'un clic, empêcher la propagation
    if (e) {
      e.stopPropagation();
    }
    
    try {
      await navigator.clipboard.writeText(appreciation.comment);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setShowActions(false); // Ferme le menu après la copie
    } catch (error) {
      console.error('Erreur lors de la copie :', error);
    }
  };

  // Gestionnaire de clic pour la carte entière
  const handleCardClick = (e: React.MouseEvent) => {
    // Vérifie si le clic ne vient pas du menu d'actions
    if (!(e.target as HTMLElement).closest('.actions-menu')) {
      handleCopy();
    }
  };

    function getLevelColor(level: string) {
        switch (level.toLowerCase()) {
            case 'excellent':
                return 'bg-green-600 text-white';
            case 'good':
                return 'bg-blue-600 text-white';
            case 'average':
                return 'bg-yellow-600 text-white';
            default:
                return 'bg-gray-600 text-white';
        }
    }

  return (
    <div className="group flex items-start gap-2 relative">
      {/* Carte principale - maintenant cliquable */}
      <div 
        onClick={handleCardClick}
        className="
          flex-1 bg-background-light rounded-lg p-6 shadow-lg
          cursor-pointer
          hover:bg-opacity-80 hover:shadow-xl
          transition-all duration-200
          group/card
        "
      >
        {/* Indicateur de copie au survol */}
        <div className="absolute right-16 top-3 opacity-0 group-hover/card:opacity-100 transition-opacity text-sm text-gray-400">
          Cliquer pour copier
        </div>

        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${getLevelColor(appreciation.level)}`}>
                {appreciation.level}
              </span>
            </div>
            <p className="text-gray-300 mt-2 break-words">
              {appreciation.comment}
            </p>
          </div>
        </div>
      </div>

      {/* Menu d'actions - maintenant dans une div avec une classe pour l'identifier */}
      <div className="actions-menu">
        <button
          className={`
            p-2 rounded-full transition-all duration-200
            hover:bg-background-light
            ${showActions ? 'bg-background-light' : 'bg-transparent'}
          `}
          onClick={(e) => {
            e.stopPropagation();
            setShowActions(!showActions);
          }}
          aria-label="Menu d'actions"
        >
          <MoreVertical size={20} />
        </button>

        {/* Menu déroulant */}
        {showActions && (
          <div 
            className="
              absolute right-12 top-0
              bg-background-light rounded-lg shadow-xl
              py-2 min-w-[160px]
              animate-in slide-in-from-right-2
              z-10
            "
          >
            <button
              onClick={(e) => handleCopy(e)}
              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-colors"
            >
              <Copy size={16} />
              <span>Copier</span>
            </button>
            
            {/* Autres boutons du menu inchangés */}
            {/* ... */}
          </div>
        )}
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-in fade-in">
          Texte copié dans le presse-papiers !
        </div>
      )}
    </div>
  );
};