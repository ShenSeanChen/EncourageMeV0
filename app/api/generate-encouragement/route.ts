// app/api/generate-encouragement/route.ts
// API route for generating encouragement using OpenAI

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: Request) {
  try {
    const { content, apiKey } = await request.json();

    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key is required' },
        { status: 400 }
      );
    }

    const openai = new OpenAI({ apiKey });

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a supportive and empathetic friend. Provide a brief, personalized encouragement (2-3 sentences) based on what someone shares with you."
        },
        {
          role: "user",
          content
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      encouragement: response.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    // Ensure error is of type Error to access its properties
    const errorInstance = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json(
      { error: errorInstance.message || 'Failed to generate encouragement' },
      { status: 500 }
    );
  }
} 