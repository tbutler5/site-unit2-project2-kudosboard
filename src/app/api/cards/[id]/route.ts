import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const deleted = await prisma.card.delete({
    where: {id:  Number(id) },
  });

  return NextResponse.json(deleted);
}

export async function PATCH(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const updated = await prisma.card.update({
    where: { id: Number(id) },
    data: {
      upvotes: {
        increment: 1,
      },
    },
  });

  return NextResponse.json(updated);
}
