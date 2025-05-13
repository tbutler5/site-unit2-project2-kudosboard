import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const { message, gifUrl, boardId, author } = data;

  if (!message || !gifUrl || !boardId) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newCard = await prisma.card.create({
    data: {
      message,
      gifUrl,
      author,
      board: {
        connect: {
          id: Number(boardId),
        },
      },
    },
  });

  return NextResponse.json(newCard, { status: 201 });
}
