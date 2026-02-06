import RecipeCard from './RecipeCard';

export default function RecipeList({ recipes, ingredients }) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      {/* Ingrédients détectés */}
      {ingredients && ingredients.length > 0 && (
        <div className="card mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            🔍 Ingrédients détectés
          </h3>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ingredient, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium"
              >
                {ingredient}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Liste des recettes */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          🍳 Recettes suggérées
        </h2>
        <p className="text-gray-600">
          {recipes.length} recette{recipes.length > 1 ? 's' : ''} créative{recipes.length > 1 ? 's' : ''} pour vous
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
