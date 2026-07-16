import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

// Ação para salvar o rapaz direto no banco de dados
async function adicionarRapaz(formData) {
  'use server';
  
  const nome = formData.get('nome');
  const telefone = formData.get('telefone');
  const classeOuQuorum = formData.get('classeOuQuorum');
  const dataNascimentoStr = formData.get('dataNascimento');
  
  let dataNascimento = null;
  if (dataNascimentoStr) {
    // Converte a data do HTML (YYYY-MM-DD) para salvar no banco
    dataNascimento = new Date(`${dataNascimentoStr}T12:00:00Z`);
  }
  
  await prisma.jovem.create({
    data: {
      nome,
      telefone,
      organizacao: 'Rapazes',
      classeOuQuorum,
      dataNascimento,
      status: 'Ativo'
    }
  });
  
  revalidatePath('/dashboard/rapazes');
}

export default async function RapazesPage() {
  // Puxa os rapazes do seu banco de dados
  const rapazes = await prisma.jovem.findMany({
    where: { organizacao: 'Rapazes' },
    orderBy: { nome: 'asc' }
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2563eb' }}>
          🛡️ Acompanhamento dos Rapazes
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginTop: '5px' }}>
          Cadastre os jovens da ala para que o Robô envie relatórios e lembretes de aniversário.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* Formulário de Cadastro */}
        <div style={{ flex: '1', backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Cadastrar Novo Jovem</h2>
          
          <form action={adicionarRapaz} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Nome Completo</label>
              <input type="text" name="nome" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Ex: Jeremias Joel" />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>WhatsApp (com DDD)</label>
              <input type="text" name="telefone" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Ex: 11999999999" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Data de Nascimento (Para o Robô)</label>
              <input type="date" name="dataNascimento" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Quórum</label>
              <select name="classeOuQuorum" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="Diáconos">Quórum de Diáconos</option>
                <option value="Mestres">Quórum de Mestres</option>
                <option value="Sacerdotes">Quórum de Sacerdotes</option>
              </select>
            </div>

            <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', padding: '12px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
              Salvar no Banco
            </button>
          </form>
        </div>

        {/* Lista que mostra o que está no Banco de Dados */}
        <div style={{ flex: '2', backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Rapazes Cadastrados ({rapazes.length})</h2>
          
          {rapazes.length === 0 ? (
            <p style={{ color: '#64748b' }}>Nenhum jovem cadastrado ainda.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Nome</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Quórum</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Data Nasc.</th>
                </tr>
              </thead>
              <tbody>
                {rapazes.map((rapaz) => (
                  <tr key={rapaz.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{rapaz.nome}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{rapaz.classeOuQuorum}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>
                      {rapaz.dataNascimento ? new Date(rapaz.dataNascimento).toLocaleDateString('pt-BR') : 'Sem data'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}