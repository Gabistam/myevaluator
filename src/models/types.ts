// Définition des types principaux de l'application
export interface RootData {
    _id: string;
    categories: Category[];
  }
  
  export interface Category {
    id: string;
    name: string;
    image: string;  // Pour les émojis comme "💻"
    appreciations: Appreciation[];
  }
  
  export interface Appreciation {
    id: string;
    level: string;
    comment: string;
    isFavorite: boolean;
    userId: string | null;
  }
  
  // Types utilitaires pour la gestion des favoris
  export interface FavoriteState {
    [appreciationId: string]: boolean;
  }
  
  // Types pour les réponses d'API
  export interface ApiResponse<T> {
    data: T;
    error?: string;
  }