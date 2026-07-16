import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await prisma.notaFiscal.deleteMany({});
    return NextResponse.json({ success: true, message: "LIMPAMOS TUDO COM SUCESSO! Banco de dados zerado." });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
