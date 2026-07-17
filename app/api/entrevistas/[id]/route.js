import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function PUT(request, { params }) {
  try {
    const id = parseInt(params.id);
    const data = await request.json();

    const entrevista = await prisma.entrevista.update({
      where: { id },
      data: {
        status: data.status,
      }
    });

    // Se marcou como concluída, atualiza a ficha do membro!
    if (data.status === 'Concluída') {
      await prisma.jovem.update({
        where: { id: entrevista.membroId },
        data: { dataUltimaEntrevista: new Date() }
      });
    }

    return NextResponse.json(entrevista);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao atualizar entrevista' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = parseInt(params.id);
    
    await prisma.entrevista.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Erro ao deletar entrevista' }, { status: 500 });
  }
}
