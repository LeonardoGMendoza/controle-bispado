import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const membros = await prisma.membro.findMany({
      orderBy: { nome: 'asc' }
    });
    return NextResponse.json(membros);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar membros' }, { status: 500 });
  }
}
