import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

export async function POST(request) {
  try {
    const data = await request.json();
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const novoEvento = await prisma.evento.create({
      data: {
        titulo: data.titulo,
        inicio: new Date(data.inicio),
        fim: new Date(data.fim),
        diaInteiro: data.diaInteiro || false,
        tipo: data.tipo,
        descricao: data.descricao,
        cor: data.cor || '#3B82F6'
      }
    });

    return NextResponse.json(novoEvento);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID não fornecido' }, { status: 400 });

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const cleanId = parseInt(id.replace('ev_', ''), 10);

    await prisma.evento.delete({
      where: { id: cleanId }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar evento:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
