'use client';

interface ConfirmationModalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const ConfirmationModal = ({ message, onConfirm, onCancel, isLoading }: ConfirmationModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-sm animate-fade-in-fast">
        <h2 className="text-xl font-bold text-rich-black mb-4">Confirm Action</h2>
        <p className="text-rich-black mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md text-rich-black bg-gray-200 hover:bg-gray-300" disabled={isLoading}>
            Cancel
          </button>
          <button type="button" onClick={onConfirm} className="px-4 py-2 rounded-md text-white bg-chestnut-red hover:bg-red-700 disabled:bg-gray-400" disabled={isLoading}>
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
