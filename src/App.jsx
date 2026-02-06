import { useState } from 'react';
import UploadZone from './components/UploadZone';
import Filters from './components/Filters';
import RecipeList from './components/RecipeList';
import LoadingSpinner from './components/LoadingSpinner';
import { analyzeImage } from './services/api';

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [filters, setFilters] = useState({ dietary: [], maxTime: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleImageSelected = (file) => {
    setSelectedImage(file);
    setError(null);
    setResults(null);
    
    // Créer une preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const response = await analyzeImage(selectedImage, filters);
      setResults(response.data);
    } catch (err) {
      console.error('Erreur:', err);
      setError(
        err.response?.data?.message || 
        'Une erreur est survenue lors de l\'analyse. Vérifiez que le backend est démarré.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setResults(null);
    setError(null);
    setFilters({ dietary: [], maxTime: null });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-3">
            🍳 Assistant Recettes IA
          </h1>
          <p className="text-xl text-gray-600">
            Photographiez votre frigo, découvrez des recettes créatives
          </p>
        </header>

        {/* Zone principale */}
        <div className="space-y-6">
          {!selectedImage ? (
            <UploadZone onImageSelected={handleImageSelected} />
          ) : (
            <>
              {/* Preview de l'image */}
              <div className="card">
                <div className="flex items-start gap-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {selectedImage.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button
                      onClick={handleReset}
                      className="text-sm text-red-600 hover:text-red-700 font-medium"
                    >
                      ✕ Changer d'image
                    </button>
                  </div>
                </div>
              </div>

              {/* Filtres */}
              {!results && <Filters onFiltersChange={setFilters} />}

              {/* Bouton d'analyse */}
              {!results && (
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className="btn-primary w-full"
                >
                  {loading ? 'Analyse en cours...' : '🔍 Analyser et générer des recettes'}
                </button>
              )}
            </>
          )}

          {/* État de chargement */}
          {loading && (
            <LoadingSpinner message="L'IA analyse votre image et génère des recettes..." />
          )}

          {/* Erreur */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <div>
                  <h3 className="font-semibold text-red-800 mb-1">Erreur</h3>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Résultats */}
          {results && (
            <>
              <RecipeList 
                recipes={results.recipes} 
                ingredients={results.ingredients}
              />
              
              <div className="flex justify-center">
                <button
                  onClick={handleReset}
                  className="btn-secondary"
                >
                  ← Analyser une nouvelle image
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Propulsé par Claude (Anthropic) 🤖</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
