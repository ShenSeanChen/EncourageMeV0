'use client';

import { useState } from 'react';
import { createThought } from '@/lib/api';

interface ThoughtFormProps {
  onThoughtAdded: (encouragement: string) => void;
}

export default function ThoughtForm({ onThoughtAdded }: ThoughtFormProps) {
  const [thought, setThought] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await createThought(thought);
      onThoughtAdded(response.encouragement);
      setThought('');
    } catch (error) {
      console.error('Error submitting thought:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <textarea
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        placeholder="Share your thoughts..."
        className="w-full p-4 rounded-lg border border-blue-200 
          focus:ring-2 focus:ring-blue-500 focus:border-transparent 
          resize-none h-32 text-gray-900 placeholder-gray-500
          bg-white shadow-sm transition-all duration-200
          hover:border-blue-300"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg 
          hover:bg-blue-600 transition-colors disabled:bg-gray-400
          shadow-sm hover:shadow-md"
      >
        {isLoading ? 'Encouraging...' : 'Encourage Me'}
      </button>
    </form>
  );
}
