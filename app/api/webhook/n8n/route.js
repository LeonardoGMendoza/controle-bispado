import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function POST(request) {
  try {
    const data = await request.json();

    // Ignora mensagens sem foto — só salva se tiver imagem anexada
    if (!data.urlAnexo || data.urlAnexo === '') {
      return NextResponse.json({ success: false, motivo: 'Sem foto, ignorado' }, { status: 200 });
    }

    const novaNota = await prisma.notaFiscal.create({
      data: {
        fornecedor: data.fornecedor || 'Desconhecido',
        valor: parseFloat(data.valor) || 0.0,
        dataEmissao: data.dataEmissao ? new Date(data.dataEmissao) : new Date(),
        descricao: data.descricao || '',
        categoria: data.categoria || 'Geral',
        urlAnexo: data.urlAnexo,
        cnpj: data.cnpj || null,
        status: 'Pendente'
      }
    });

    return NextResponse.json({ success: true, nota: novaNota }, { status: 201 });
  } catch (error) {
    console.error("Erro no Webhook do n8n:", error);
    return NextResponse.json({ success: false, error: 'Erro ao processar dados' }, { status: 500 });
  }
}
