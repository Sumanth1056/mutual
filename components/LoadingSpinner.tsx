
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-secondary rounded-full animate-spin"></div>
    </div>
  );
};
