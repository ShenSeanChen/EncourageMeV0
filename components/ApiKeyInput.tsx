// components/ApiKeyInput.tsx
// Component for managing OpenAI API key input

import { useState } from 'react';
import { useApiKey } from '@/lib/contexts/ApiKeyContext';

export default function ApiKeyInput() {
  const { apiKey, setApiKey } = useApiKey();
  const [showKey, setShowKey] = useState(false);
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputKey);
  };

  return (
    <div className="w-full max-w-md mx-auto mb-8 p-4 bg-white rounded-lg shadow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700">
            OpenAI API Key
          </label>
          <div className="relative mt-1">
            <input
              type={showKey ? 'text' : 'password'}
              id="apiKey"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="sk-..."
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
            >
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Save API Key
        </button>
      </form>
    </div>
  );
} 