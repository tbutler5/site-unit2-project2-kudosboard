'use client';

import { useState } from 'react';
import { Board } from '@prisma/client';

type Props = {
  onClose: () => void;
  onCreated: (newBoard: Board) => void;
};

export function NewBoardModal({ onClose, onCreated }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !category) return;

    setLoading(true);
    const res = await fetch('/api/boards', {
      method: 'POST',
      body: JSON.stringify({
        title,
        category,
        author,
        imageUrl: `https://picsum.photos/seed/board${Math.floor(Math.random() * 100)}/300/200`, 
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      onCreated(data);
      onClose();
    } else {
      alert(data.error || 'Error creating board');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Create a New Board</h2>

        <label className="block mb-1 font-medium">Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-1 font-medium">Category:</label>
        <select
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        >
          <option value="">Select a category</option>
          <option value="CELEBRATION">Celebration</option>
          <option value="THANK_YOU">Thank You</option>
          <option value="INSPIRATION">Inspiration</option>
        </select>

        <label className="block mb-1 font-medium">Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
        >
          {loading ? 'Creating...' : 'Create Board'}
        </button>
      </div>
    </div>
  );
}
