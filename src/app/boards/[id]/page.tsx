import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface BoardPageProps {
  params: { id: string };
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { id } = params; // Access the ID from the params

  // Fetch the board details along with cards
  const board = await prisma.board.findUnique({
    where: {
      id: parseInt(id), // Convert the id from string to number
    },
    include: {
      cards: true, // Fetch associated cards as well
    },
  });

  if (!board) {
    notFound(); // Return 404 if the board doesn't exist
  }

  return (
    <div>
      <h1>{board.title}</h1>
      <p>{board.category}</p>
      {board.imageUrl ? (
        <img
          src={board.imageUrl}
          alt={board.title}
          className="rounded-md mb-4"
        />
      ) : (
        <div>No Image Available</div>
      )}
      <p>Author: {board.author}</p>

      <h2>Cards</h2>
      <div className="cards">
        {board.cards.map((card) => (
          <div key={card.id} className="card p-2 border rounded mt-2">
            <p>{card.message}</p>
            {card.gifUrl && <img src={card.gifUrl} alt={card.message} className="mt-2 rounded-md w-full" />}
          </div>
        ))}
      </div>
    </div>
  );
}
