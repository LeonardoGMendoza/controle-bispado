import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs/promises';
import path from 'path';

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

    let caminhoFinalAnexo = data.urlAnexo;

    // Se for URL do Waha, tenta baixar o arquivo para guardar permanentemente
    if (data.urlAnexo.includes('187.77.32.137:8101')) {
      try {
        const targetUrl = new URL(data.urlAnexo);
        const apiKey = targetUrl.searchParams.get('X-Api-Key');
        
        const headers = new Headers();
        if (apiKey) {
          headers.set('X-Api-Key', apiKey);
        }

        const response = await fetch(targetUrl.toString(), { headers });
        
        if (response.ok) {
          const buffer = await response.arrayBuffer();
          
          // Garante que a pasta public/anexos existe
          const anexosDir = path.join(process.cwd(), 'public', 'anexos');
          await fs.mkdir(anexosDir, { recursive: true });
          
          // Gera nome unico
          const fileName = `nota_${Date.now()}_${Math.floor(Math.random() * 1000)}.jpg`;
          const filePath = path.join(anexosDir, fileName);
          
          // Salva no disco
          await fs.writeFile(filePath, Buffer.from(buffer));
          
          // Atualiza o caminho final para salvar no banco
          caminhoFinalAnexo = `/anexos/${fileName}`;
        } else {
          console.error("Falha ao baixar anexo do Waha. Status:", response.status);
        }
      } catch (downloadError) {
        console.error("Erro ao tentar fazer o download do anexo:", downloadError);
        // Em caso de erro, mantem a URL original como fallback
      }
    }

    const novaNota = await prisma.notaFiscal.create({
      data: {
        fornecedor: data.fornecedor || 'Desconhecido',
        valor: parseFloat(data.valor) || 0.0,
        dataEmissao: data.dataEmissao ? new Date(data.dataEmissao) : new Date(),
        descricao: data.descricao || '',
        categoria: data.categoria || 'Geral',
        urlAnexo: caminhoFinalAnexo,
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
