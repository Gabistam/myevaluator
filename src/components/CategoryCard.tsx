// src/components/CategoryCard.tsx
import React from 'react';
import { Category } from '../models/types';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="card block hover:bg-background-dark transition-colors">
      <div className="flex items-center gap-4">
        <span className="text-4xl">{category.image}</span>
        <h2 className="text-xl font-semibold">{category.name}</h2>
      </div>
    </Link>
  );
};

