// app/api/generate-encouragement/route.ts
// API route for generating encouragement using OpenAI

import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
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
    return NextResponse.json(
      { error: 'Failed to generate encouragement' }, 
      { status: 500 }
    );
  }
} 