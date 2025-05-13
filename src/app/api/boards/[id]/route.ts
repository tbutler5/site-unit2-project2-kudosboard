import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const board = await prisma.board.findUnique({
    where: { id: Number(params.id) },
    include: {
      cards: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!board) return NextResponse.json({ error: 'Board not found' }, { status: 404 });

  return NextResponse.json(board);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  // First delete all cards for that board
  await prisma.card.deleteMany({
    where: { boardId: id },
  });

  // Then delete the board
  const deletedBoard = await prisma.board.delete({
    where: { id },
  });

  return NextResponse.json(deletedBoard);
}
