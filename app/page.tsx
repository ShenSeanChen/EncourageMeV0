// app/page.tsx
// Home page component displaying the main thought submission interface

'use client';

import { useState } from 'react';
import ThoughtForm from '@/components/ThoughtForm';
import ThoughtsList from '@/components/ThoughtsList';
import EncouragementModal from '@/components/EncouragementModal';
import ApiKeyInput from '@/components/ApiKeyInput';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEncouragement, setCurrentEncouragement] = useState('');

  const handleNewThought = (encouragement: string) => {
    setCurrentEncouragement(encouragement);
    setIsModalOpen(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Encourage Me</h1>
      
      <ApiKeyInput />
      
      <ThoughtForm onThoughtAdded={handleNewThought} />
      
      <ThoughtsList />
      
      <EncouragementModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        encouragement={currentEncouragement}
      />
    </main>
  );
}