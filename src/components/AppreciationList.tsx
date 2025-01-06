import React, { useState } from 'react';
import { Appreciation } from '../models/types';
import { Toast } from './Toast';
import { useData } from '../contexts/DataContext';

interface AppreciationListProps {
  appreciations: Appreciation[];
}

export const AppreciationList: React.FC<AppreciationListProps> = ({ appreciations }) => {
  const { favorites, toggleFavorite } = useData();
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleCopy = async (comment: string) => {
    try {
      await navigator.clipboard.writeText(comment);
      setToastMessage('Commentaire copié !');
      setToastVisible(true);
    } catch (error) {
        console.log(error);
        
      setToastMessage('Erreur lors de la copie');
      setToastVisible(true);
    }
  };

  return (
    <div className="space-y-6">
      {appreciations.map((appreciation) => (
        <div 
          key={appreciation.id}
          className="bg-background-light rounded-lg p-6 shadow-lg"
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${getLevelColor(appreciation.level)}`}>
                  {appreciation.level}
                </span>
              </div>
              <p className="text-gray-300 mt-2">{appreciation.comment}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopy(appreciation.comment)}
                className="p-2 hover:bg-primary rounded-full transition-colors"
                title="Copier le commentaire"
              >
                📋
              </button>
              <button
                onClick={() => toggleFavorite(appreciation.id)}
                className={`p-2 hover:bg-primary rounded-full transition-colors
                  ${favorites[appreciation.id] ? 'text-yellow-300' : 'text-gray-400'}`}
                title={favorites[appreciation.id] ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                ⭐
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <Toast
        message={toastMessage}
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </div>
  );
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