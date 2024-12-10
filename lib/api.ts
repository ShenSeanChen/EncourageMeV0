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
  const savedKey = localStorage.getItem('openai_api_key');
  
  if (!savedKey) {
    return "Please add your OpenAI API key to receive personalized encouragement!";
  }

  try {
    const response = await fetch('/api/generate-encouragement', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        content,
        apiKey: savedKey
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'Failed to generate encouragement');
    }

    const data = await response.json();
    if (!data.encouragement) {
      throw new Error('No encouragement received from API');
    }
    return data.encouragement;
  } catch (error) {
    console.error('Error generating encouragement:', error);
    // Check if it's an API key related error
    if (error instanceof Error && error.message.includes('API key')) {
      return "Please check your OpenAI API key and try again.";
    }
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
