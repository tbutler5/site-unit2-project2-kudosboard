'use client';

import { useState } from 'react';

interface Card {
  id: number;
  message: string;
  gifUrl: string;
  upvotes: number;
  title?: string;
}

interface Board {
  id: number;
  title: string;
  cards: Card[];
}

export function BoardClient({ board: initialBoard }: { board: Board }) {
  const [board, setBoard] = useState(initialBoard);

  async function handleUpvote(cardId: number) {
    const res = await fetch(`/api/cards/${cardId}/upvote`, {
      method: 'POST',
    });
    const updatedCard = await res.json();

    setBoard({
      ...board,
      cards: board.cards.map((card) =>
        card.id === cardId ? updatedCard : card
      ),
    });
  }

  return (
    <div className="board-page max-w-4xl mx-auto py-6">
      <a href="/" className="block mb-4 text-blue-500 hover:underline">
        ← Back to Boards
      </a>

      <h2 className="text-2xl font-semibold text-center">{board.title} 😄</h2>

      <div className="center-create-button text-center my-6">
        <button className="create-card-btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
          Create a Card
        </button>
      </div>

      <div className="card-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {board.cards.map((card) => (
          <div key={card.id} className="card-preview p-4 border rounded-lg shadow-md">
            <div className="card text-center">
              <h3 className="text-lg font-semibold">{card.title || 'Untitled Card'}</h3>
              <p className="text-gray-700">{card.message}</p>
              {card.gifUrl && (
                <img src={card.gifUrl} alt={card.message} className="mt-2 rounded-md w-full" />
              )}
              <div className="flex justify-center space-x-4 mt-3">
                <button
                  onClick={() => handleUpvote(card.id)}
                  className="upvote-button bg-green-500 text-white px-3 py-1 rounded-md"
                >
                  Upvote: {card.upvotes}
                </button>
                <button className="delete-button bg-red-500 text-white px-3 py-1 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="text-center mt-6 text-gray-500">
        <p>© 2024 Kudoboard</p>
      </footer>
    </div>
  );
}