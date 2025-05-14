import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const cardId = parseInt(params.id);

  if (isNaN(cardId)) {
    return NextResponse.json({ error: 'Invalid card ID' }, { status: 400 });
  }

  const updatedCard = await prisma.card.update({
    where: { id: cardId },
    data: { upvotes: { increment: 1 } },
  });

  return NextResponse.json(updatedCard);
}
