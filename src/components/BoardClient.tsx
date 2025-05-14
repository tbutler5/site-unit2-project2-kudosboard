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
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [gifUrl, setGifUrl] = useState('');
  const [author, setAuthor] = useState('');

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

  async function handleDelete(cardId: number) {
    const res = await fetch(`/api/cards/${cardId}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setBoard({
        ...board,
        cards: board.cards.filter((card) => card.id !== cardId),
      });
    } else {
      const data = await res.json();
      alert(data.error || 'Error deleting card');
    }
  }

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        message,
        gifUrl,
        boardId: board.id,
        author,
      }),
    });

    if (res.ok) {
      const newCard = await res.json();
      setBoard({ ...board, cards: [newCard, ...board.cards] });
      setShowModal(false);
      setTitle('');
      setMessage('');
      setGifUrl('');
      setAuthor('');
    } else {
      const data = await res.json();
      alert(data.error || 'Failed to create card');
    }
  }

  return (
    <div className="board-page max-w-4xl mx-auto py-6 relative">
      <a href="/" className="block mb-4 text-blue-500 hover:underline">
        ← Back to Boards
      </a>

      <h2 className="text-2xl font-semibold text-center">{board.title} 😄</h2>

      <div className="center-create-button text-center my-6">
        <button
          onClick={() => setShowModal(true)}
          className="create-card-btn bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Create a Card
        </button>
      </div>

      <div className="card-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {board.cards.map((card) => (
          <div key={card.id} className="card-preview p-4 border rounded-lg shadow-md">
            <div className="card text-center">
              <h3 className="text-lg text-gray-700 font-semibold">{card.title || 'Untitled Card'}</h3>
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
                <button
                  onClick={() => handleDelete(card.id)}
                  className="delete-button bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <form
            onSubmit={handleCreateCard}
            className="new-card-form bg-white rounded-lg p-6 w-full max-w-md relative"
          >
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4">Create a New Card</h2>

            <input
              type="text"
              placeholder="Enter card title"
              className="w-full mb-2 p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter card description"
              className="w-full mb-2 p-2 border rounded"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter GIF URL"
              className="w-full mb-2 p-2 border rounded"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter owner (optional)"
              className="w-full mb-4 p-2 border rounded"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <button
              type="submit"
              className="submit bg-blue-600 text-white py-2 px-4 rounded-md w-full hover:bg-blue-700"
            >
              Create Card
            </button>
          </form>
        </div>
      )}
    </div>
  );
}