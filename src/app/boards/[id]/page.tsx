import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import { BoardClient } from '@/components/BoardClient';

const prisma = new PrismaClient();

export default async function BoardPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const board = await prisma.board.findUnique({
    where: { id: parseInt(id) },
    include: { cards: true },
  });

  if (!board) notFound();

  return <BoardClient board={board} />;
}