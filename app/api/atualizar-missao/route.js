import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { inverterNome } from '../../dashboard/indicadores/mockData.js';

export async function GET() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const names = [
      'Roberto Junior Teixeira de Jesus',
      'Jonathan Mosíah Rincón Maurera',
      'Rodrigo Augusto Arcanjo Teles',
      'Gustavo Silva Lopes Magnavita',
      'Jeremias Joel Bracho Ledezma',
      'Augusto Henrique Arcanjo Teles',
      'William Silva Freitas',
      'Henrique Alves Sabino',
      'Paulo Henrique Dos Santos',
      'Maria Laura Batista Cardoso',
      'Ana Clara dos Anjos Gama',
      'Leslie Valentina Bracho Ledezma',
      'Leticia Cleto de Sousa',
      'Jennifer Lucia Atahuachi Ortiz',
      'Kemilly costa maia Averedo',
      'Emanuela Núria Moreira de Lima',
      'Claryssa Geovana Rodrigues',
      'Valéria Pachuri Velez',
      'Heloísa Santiago Morais',
      'Nicolly Gomes Alves Pereira',
      'Julia Hagata Lopes da Silva'
    ];

    let count = 0;
    for (const n of names) {
      const inverted = inverterNome(n);
      // Alguns nomes podem ter diferenças pequenas (ex: Rodrigues vs Rodrigues dos Santos)
      // Vamos tentar buscar pelo inverted exato.
      const updated = await prisma.membro.updateMany({
        where: { nome: inverted },
        data: { focoMissao: 'Preparação Missão (Até 25 anos)' }
      });
      if (updated.count > 0) count += updated.count;
      else {
        // Fallback: buscar por aproximação se o nome invertido falhar
        const first = n.split(' ')[0];
        const last = n.split(' ').pop();
        await prisma.membro.updateMany({
          where: { nome: { contains: last + ', ' + first } },
          data: { focoMissao: 'Preparação Missão (Até 25 anos)' }
        });
        count++;
      }
    }

    return NextResponse.json({ success: true, message: `Atualizados ${count} jovens para o Foco Missão!` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
