// src/components/AppreciationCard.tsx
import React, { useState } from 'react';
import { Appreciation } from '../models/types';
import { MoreVertical, Copy, Star, Edit, Trash2 } from 'lucide-react';
import { Toast } from './Toast';

interface AppreciationCardProps {
  appreciation: Appreciation;
  onToggleFavorite: (id: string) => void;
}

export const AppreciationCard: React.FC<AppreciationCardProps> = ({
  appreciation,
  onToggleFavorite // N'oublions pas d'utiliser cette prop
}) => {
  const [showActions, setShowActions] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fonction pour copier le texte
  const handleCopy = async (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    try {
      await navigator.clipboard.writeText(appreciation.comment);
      setToastMessage('Texte copié dans le presse-papiers !');
        setShowToast(true);
      setShowActions(false);
    } catch (error) {
      console.error('Erreur lors de la copie :', error);
      setToastMessage('Erreur lors de la copie !');
        setShowToast(true);
    }
  };

  // Gestionnaire pour le bouton favori
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Empêche la propagation du clic
    onToggleFavorite(appreciation.id);
    setShowActions(false); // Ferme le menu après l'action
  };

  // Gestionnaire de clic pour la carte entière
  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.actions-menu')) {
      handleCopy();
    }
  };

  // Fonction utilitaire pour déterminer la couleur en fonction du niveau
  function getLevelColor(level: string): string {
    const colors: Record<string, string> = {
      'Exceptionnel': 'bg-green-600 text-white',
      'Excellent': 'bg-green-500 text-white',
      'Très bon': 'bg-blue-500 text-white',
      'Bon': 'bg-blue-400 text-white',
      'Satisfaisant': 'bg-blue-300 text-black',
      'Passable': 'bg-yellow-400 text-black',
      'Médiocre': 'bg-orange-400 text-white',
      'Faible': 'bg-orange-500 text-white',
      'Insuffisant': 'bg-red-500 text-white',
      'Très insuffisant': 'bg-red-600 text-white',
    };
    
    return colors[level] || 'bg-gray-500 text-white';
  }

  return (
    <div className="group flex items-start gap-2 relative">
      {/* Carte principale cliquable */}
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

      {/* Menu d'actions */}
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

        {/* Menu déroulant avec les actions */}
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
            
            {/* Bouton Favori ajouté */}
            <button
              onClick={handleFavorite}
              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-colors"
            >
              <Star 
                size={16} 
                className={appreciation.isFavorite ? 'fill-yellow-300 text-yellow-300' : ''} 
              />
              <span>
                {appreciation.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              </span>
            </button>

            {/* Actions futures (désactivées pour l'instant) */}
            <button
              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-colors text-gray-400"
              disabled
            >
              <Edit size={16} />
              <span>Modifier</span>
            </button>
            
            <button
              className="w-full px-4 py-2 flex items-center gap-2 hover:bg-primary/20 transition-colors text-gray-400"
              disabled
            >
              <Trash2 size={16} />
              <span>Supprimer</span>
            </button>
          </div>
        )}
      </div>

      <Toast
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000} // Optionnel, valeur par défaut dans le composant
      />
    </div>
  );
};