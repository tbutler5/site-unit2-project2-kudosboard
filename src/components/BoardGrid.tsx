import Link from 'next/link';
import { Board } from '@prisma/client';

type BoardGridProps = {
  boards: Board[];  
  onDelete: (id: number) => void;
};

export const BoardGrid = ({ boards, onDelete }: BoardGridProps) => {
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/boards/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        onDelete(id); 
      } else {
        const data = await res.json();
        alert(data.error || 'Error deleting board');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <section className="board-grid grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {boards.map((board) => (
        <article
          key={board.id}
          className="board-preview border rounded-lg p-3 shadow hover:shadow-md bg-white transition"
          aria-label={`Board card ${board.id}`}
        >
          {board.imageUrl ? (
            <img
              src={board.imageUrl}
              alt={board.title}
              className="rounded-md mb-2 w-full object-cover h-48"
            />
          ) : (
            <div className="rounded-md mb-2 w-full h-48 bg-gray-300 flex items-center justify-center">
              <span className="text-gray-600">No Image</span>
            </div>
          )}
          <h3 className="text-lg font-bold mb-1">{board.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{board.category}</p>
          <div className="flex justify-between items-center gap-2">
            <Link
              href={`/boards/${board.id}`}
              className="button-common view-board bg-blue-600 px-3 py-1.5 rounded hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 text-sm"
            >
              <span className="text-white">View Board</span>
            </Link>
            <button
              onClick={() => handleDelete(board.id)}
              className="button-common delete-board text-red-600 hover:underline text-sm"
              aria-label="Delete this board"
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </section>
  );
};