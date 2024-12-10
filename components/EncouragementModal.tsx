// components/EncouragementModal.tsx
// Modal component for displaying encouragement messages

interface EncouragementModalProps {
  isOpen: boolean;
  onClose: () => void;
  encouragement: string;
}

export default function EncouragementModal({
  isOpen,
  onClose,
  encouragement,
}: EncouragementModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Your Encouragement</h2>
        <p className="text-gray-700 text-lg mb-6">{encouragement}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}
