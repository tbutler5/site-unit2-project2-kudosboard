import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  const deleted = await prisma.card.delete({
    where: { id },
  });

  return NextResponse.json(deleted);
}

export async function PATCH(_: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);

  const updated = await prisma.card.update({
    where: { id },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(updated);
}
