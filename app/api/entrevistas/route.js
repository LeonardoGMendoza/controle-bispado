import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const entrevistas = await prisma.entrevista.findMany({
      include: {
        membro: true
      },
      orderBy: { dataHora: 'asc' }
    });
    return NextResponse.json(entrevistas);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao buscar entrevistas' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const entrevista = await prisma.entrevista.create({
      data: {
        membroId: parseInt(data.membroId),
        dataHora: new Date(data.dataHora),
        tipo: data.tipo,
        observacoes: data.observacoes || '',
        status: data.status || 'Agendada'
      }
    });
    return NextResponse.json(entrevista, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao criar entrevista' }, { status: 500 });
  }
}
