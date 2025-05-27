import React from 'react';

const ErrorComponent = ({ error }) => {
  if (!error) return null;

  return (
    <div className="max-w-md mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div className="flex items-center">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-red-600 text-sm font-bold">!</span>
        </div>
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    </div>
  );
};

export default ErrorComponent;