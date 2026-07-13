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

    // The data sent from n8n might look like this:
    // {
    //   "fornecedor": "Mercado",
    //   "valor": 150.50,
    //   "descricao": "Compra para atividade dos jovens",
    //   "urlAnexo": "https://link-da-imagem.com",
    //   "categoria": "Rapazes"
    // }

    const novaNota = await prisma.notaFiscal.create({
      data: {
        fornecedor: data.fornecedor || 'Desconhecido',
        valor: parseFloat(data.valor) || 0.0,
        dataEmissao: data.dataEmissao ? new Date(data.dataEmissao) : new Date(),
        descricao: data.descricao || '',
        categoria: data.categoria || 'Geral',
        urlAnexo: data.urlAnexo || null,
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
