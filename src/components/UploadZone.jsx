import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadZone({ onImageSelected }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onImageSelected(acceptedFiles[0]);
    }
  }, [onImageSelected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    maxSize: 5242880, // 5MB
  });

  return (
    <div
      {...getRootProps()}
      className={`
        border-3 border-dashed rounded-xl p-12 text-center cursor-pointer
        transition-all duration-200
        ${isDragActive 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl">📸</div>
        
        {isDragActive ? (
          <p className="text-lg text-primary-600 font-semibold">
            Déposez l'image ici...
          </p>
        ) : (
          <>
            <p className="text-lg text-gray-700 font-semibold">
              Glissez une photo de votre frigo ici
            </p>
            <p className="text-sm text-gray-500">
              ou cliquez pour sélectionner une image
            </p>
            <p className="text-xs text-gray-400">
              JPG, PNG, GIF, WEBP • Max 5MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}
