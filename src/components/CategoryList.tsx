import React from 'react';
import { Category } from '../models/types';
import { Link } from 'react-router-dom';

interface CategoryListProps {
  categories: Category[];
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link 
          key={category.id}
          to={`/category/${category.id}`}
          className="transform hover:scale-105 transition-all duration-300"
        >
          <div className="bg-background-light rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4">
              <span className="text-4xl" role="img" aria-label={category.name}>
                {category.image}
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-100">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  {category.appreciations.length} appréciations
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};