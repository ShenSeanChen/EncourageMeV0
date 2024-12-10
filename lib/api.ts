// lib/api.ts
// API utility functions for interacting with Supabase and OpenAI

import { supabase } from './supabase';
import { Thought } from '@/types';

// Function to create a new thought
export async function createThought(content: string): Promise<Thought> {
  // Generate encouragement using OpenAI (mocked for now)
  const encouragement = await generateEncouragement(content);

  const { data, error } = await supabase
    .from('thoughts')
    .insert([{ content, encouragement }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Function to fetch all thoughts
export async function getThoughts(): Promise<Thought[]> {
  const { data, error } = await supabase
    .from('thoughts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Generates an encouraging response based on user's thought using OpenAI.
 * @param content - The user's thought content
 * @returns A string containing an encouraging response
 */
async function generateEncouragement(content: string): Promise<string> {
  try {
    const response = await fetch('/api/generate-encouragement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate encouragement');
    }

    const data = await response.json();
    return data.encouragement || "You're doing great! Keep going!";
  } catch (error) {
    console.error('Error generating encouragement:', error);
    return "You're amazing! Keep moving forward!";
  }
}

export async function deleteThought(id: string): Promise<void> {
  const { error } = await supabase
    .from('thoughts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
}
