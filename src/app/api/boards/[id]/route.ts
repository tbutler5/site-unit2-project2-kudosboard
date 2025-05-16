import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const board = await prisma.board.findUnique({
    where: { id: Number(id) },
    include: {
      cards: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!board) return NextResponse.json({ error: 'Board not found' }, { status: 404 });

  return NextResponse.json(board);
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // First delete all cards for that board
  await prisma.card.deleteMany({
    where: { boardId: Number(id) },
  });

  // Then delete the board
  const deletedBoard = await prisma.board.delete({
    where: { id: Number(id) },
  });

  return NextResponse.json(deletedBoard);
}
