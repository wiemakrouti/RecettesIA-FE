import { useState } from 'react';

export default function RecipeCard({ recipe }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card hover:scale-[1.02] transition-transform">
      {/* En-tête */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {recipe.name}
          </h3>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              ⏱️ {recipe.prepTime} min
            </span>
            <span className="flex items-center gap-1">
              📊 {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Ingrédients */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">🥘 Ingrédients</h4>
        <ul className="space-y-1">
          {recipe.ingredients.slice(0, isExpanded ? undefined : 4).map((ingredient, idx) => (
            <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
              <span className="text-primary-500 mt-1">•</span>
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
        {recipe.ingredients.length > 4 && !isExpanded && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-sm text-primary-500 hover:text-primary-600 font-medium mt-2"
          >
            + {recipe.ingredients.length - 4} autres ingrédients
          </button>
        )}
      </div>

      {/* Étapes (visible seulement si expanded) */}
      {isExpanded && (
        <div className="mb-4 pt-4 border-t border-gray-200">
          <h4 className="font-semibold text-gray-700 mb-3">👨‍🍳 Préparation</h4>
          <ol className="space-y-3">
            {recipe.steps.map((step, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex gap-3">
                <span className="font-bold text-primary-500 flex-shrink-0">
                  {idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Conseil du chef */}
      {recipe.tips && isExpanded && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
          <p className="text-sm text-amber-900">
            <span className="font-semibold">💡 Conseil du chef : </span>
            {recipe.tips}
          </p>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-all"
      >
        {isExpanded ? '▲ Voir moins' : '▼ Voir la recette complète'}
      </button>
    </div>
  );
}
