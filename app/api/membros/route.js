import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

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
