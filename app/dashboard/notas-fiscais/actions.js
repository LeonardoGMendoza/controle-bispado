'use server';

import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function uploadAnexo(formData) {
  const file = formData.get('file');
  const notaId = parseInt(formData.get('notaId'));

  if (!file || !file.name) {
    return { error: 'Nenhum arquivo enviado' };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Limpa o nome do arquivo e adiciona timestamp
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-]/g, '_');
  const filename = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), 'public', 'uploads');
  
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (e) {
    // dir exists
  }
  
  const filepath = path.join(uploadDir, filename);
  await fs.writeFile(filepath, buffer);

  const urlAnexo = `/uploads/${filename}`;

  await prisma.notaFiscal.update({
    where: { id: notaId },
    data: { urlAnexo }
  });

  revalidatePath('/dashboard/notas-fiscais');
}
