'use client';

import { useEffect, useState } from 'react';
import { Thought } from '@/types';
import { getThoughts, deleteThought } from '@/lib/api';
import { supabase } from '@/lib/supabase';

export default function ThoughtsList() {
  const [thoughts, setThoughts] = useState<Thought[]>([]);

  useEffect(() => {
    // Initial load of thoughts
    const loadThoughts = async () => {
      const data = await getThoughts();
      setThoughts(data);
    };

    loadThoughts();

    // Set up real-time subscription with specific event handlers
    const channel = supabase
      .channel('thoughts-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'thoughts'
        },
        (payload) => {
          setThoughts(current => [payload.new as Thought, ...current]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'thoughts'
        },
        (payload) => {
          setThoughts(current => 
            current.filter(thought => thought.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Handle thought deletion
  const handleDelete = async (id: string) => {
    try {
      await deleteThought(id);
    } catch (error) {
      console.error('Error deleting thought:', error);
    }
  };

  return (
    <div className="w-full mt-12 space-y-6">
      {thoughts.map((thought) => (
        <div key={thought.id} className="bg-white p-6 rounded-lg shadow-md relative">
          <button
            onClick={() => handleDelete(thought.id)}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700"
            aria-label="Delete thought"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
          <p className="text-gray-800 mb-4">{thought.content}</p>
          <p className="text-blue-600 italic">{thought.encouragement}</p>
        </div>
      ))}
    </div>
  );
}
