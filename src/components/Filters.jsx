import { useState } from 'react';

const DIETARY_OPTIONS = [
  { id: 'vegetarian', label: '🥬 Végétarien' },
  { id: 'vegan', label: '🌱 Vegan' },
  { id: 'gluten-free', label: '🌾 Sans gluten' },
  { id: 'dairy-free', label: '🥛 Sans lactose' },
];

const TIME_OPTIONS = [
  { value: null, label: 'Peu importe' },
  { value: 15, label: '≤ 15 min' },
  { value: 30, label: '≤ 30 min' },
  { value: 60, label: '≤ 1h' },
];

export default function Filters({ onFiltersChange }) {
  const [dietary, setDietary] = useState([]);
  const [maxTime, setMaxTime] = useState(null);

  const handleDietaryToggle = (id) => {
    const newDietary = dietary.includes(id)
      ? dietary.filter(d => d !== id)
      : [...dietary, id];
    
    setDietary(newDietary);
    onFiltersChange({ dietary: newDietary, maxTime });
  };

  const handleTimeChange = (time) => {
    setMaxTime(time);
    onFiltersChange({ dietary, maxTime: time });
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        🎯 Préférences (optionnel)
      </h3>
      
      {/* Régimes alimentaires */}
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-3 font-medium">Régime alimentaire</p>
        <div className="flex flex-wrap gap-2">
          {DIETARY_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => handleDietaryToggle(option.id)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${dietary.includes(option.id)
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Temps de préparation */}
      <div>
        <p className="text-sm text-gray-600 mb-3 font-medium">Temps de préparation max</p>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTimeChange(option.value)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium transition-all
                ${maxTime === option.value
                  ? 'bg-primary-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
