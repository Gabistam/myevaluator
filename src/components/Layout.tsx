import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';

export const Layout: React.FC = () => {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      {/* En-tête de l'application avec navigation */}
      <header className="bg-background-light shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-xl font-bold hover:text-primary transition-colors">
              Évaluations
            </Link>
            
            <div className="flex gap-4">
              <Link 
                to="/"
                className={`hover:text-primary transition-colors ${
                  location.pathname === '/' ? 'text-primary' : ''
                }`}
              >
                Accueil
              </Link>
              
              <Link 
                to="/favorites"
                className={`hover:text-primary transition-colors ${
                  location.pathname === '/favorites' ? 'text-primary' : ''
                }`}
              >
                Favoris
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      {/* Pied de page */}
      <footer className="bg-background-light mt-auto">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-gray-400">
          © 2025 MyEvaluator
        </div>
      </footer>
    </div>
  );
};