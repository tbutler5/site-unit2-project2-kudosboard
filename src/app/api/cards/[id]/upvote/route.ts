import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params

  if (isNaN(parseInt(id))) {
    return NextResponse.json({ error: 'Invalid card ID' }, { status: 400 });
  }

  const updatedCard = await prisma.card.update({
    where: { id: parseInt(id) },
    data: { upvotes: { increment: 1 } },
  });

  return NextResponse.json(updatedCard);
}
