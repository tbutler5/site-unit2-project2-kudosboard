import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const boards = await prisma.board.findMany({
    include: { cards: true },
    orderBy: { createdAt: 'asc' },
  });
  return NextResponse.json(boards);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { title, category, author, imageUrl } = data;

    if (!title || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newBoard = await prisma.board.create({
      data: {
        title,
        category,
        author: author || null,
        imageUrl: imageUrl || null,
      },
    });

    return NextResponse.json(newBoard, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}