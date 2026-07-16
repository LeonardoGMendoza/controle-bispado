import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient();

// Ação para salvar a jovem direto no seu banco de dados
async function adicionarMoca(formData) {
  'use server';
  
  const nome = formData.get('nome');
  const telefone = formData.get('telefone');
  const classeOuQuorum = formData.get('classeOuQuorum');
  
  await prisma.jovem.create({
    data: {
      nome,
      telefone,
      organizacao: 'Moças',
      classeOuQuorum,
      status: 'Ativo'
    }
  });
  
  revalidatePath('/dashboard/mocas');
}

export default async function MocasPage() {
  // Puxa as jovens do seu banco de dados
  const mocas = await prisma.jovem.findMany({
    where: { organizacao: 'Moças' },
    orderBy: { nome: 'asc' }
  });

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#db2777' }}>
          🌸 Acompanhamento das Moças
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginTop: '5px' }}>
          Cadastre as jovens da ala para que o Robô envie relatórios e lembretes de aniversário.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
        
        {/* Formulário de Cadastro */}
        <div style={{ flex: '1', backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Cadastrar Nova Jovem</h2>
          
          <form action={adicionarMoca} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Nome Completo</label>
              <input type="text" name="nome" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Ex: Beatriz Camilla" />
            </div>
            
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>WhatsApp (com DDD)</label>
              <input type="text" name="telefone" required style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }} placeholder="Ex: 11999999999" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#475569', marginBottom: '5px' }}>Classe</label>
              <select name="classeOuQuorum" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                <option value="Edificadoras da Fé">Edificadoras da Fé</option>
                <option value="Mensageiras da Esperança">Mensageiras da Esperança</option>
                <option value="Guardiãs da Luz">Guardiãs da Luz</option>
              </select>
            </div>

            <button type="submit" style={{ backgroundColor: '#db2777', color: '#fff', padding: '12px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer', marginTop: '10px' }}>
              Salvar no Banco
            </button>
          </form>
        </div>

        {/* Lista que mostra o que está no Banco de Dados */}
        <div style={{ flex: '2', backgroundColor: '#fff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#1e293b' }}>Moças Cadastradas ({mocas.length})</h2>
          
          {mocas.length === 0 ? (
            <p style={{ color: '#64748b' }}>Nenhuma jovem cadastrada ainda.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
                  <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Nome</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>Classe</th>
                  <th style={{ padding: '12px', borderBottom: '2px solid #e2e8f0' }}>WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {mocas.map((moca) => (
                  <tr key={moca.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{moca.nome}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{moca.classeOuQuorum}</td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{moca.telefone}</td>
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