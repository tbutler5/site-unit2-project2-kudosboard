import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { BoardClient } from '@/components/BoardClient';

const prisma = new PrismaClient();

export default async function BoardPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id);
  const board = await prisma.board.findUnique({
    where: { id },
    include: { cards: true },
  });

  if (!board) notFound();

  return <BoardClient board={board} />;
}