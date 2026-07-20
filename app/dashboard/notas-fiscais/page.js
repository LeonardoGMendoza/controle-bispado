import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';
import { uploadAnexo } from './actions';

export default async function NotasFiscaisPage() {
  const notas = await prisma.notaFiscal.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '20px', color: '#005c8a' }}>Controle de Notas Fiscais</h1>
      
      <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f4f8', borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Data</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Fornecedor</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Descrição</th>
              {/* <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Categoria</th>
              <th style={{ padding: '12px', textAlign: 'left', color: '#333' }}>Valor</th> */}
              <th style={{ padding: '12px', textAlign: 'center', color: '#333' }}>Anexo</th>
              <th style={{ padding: '12px', textAlign: 'center', color: '#333' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {notas.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#777' }}>
                  Nenhuma nota fiscal registrada ainda.
                </td>
              </tr>
            ) : (
              notas.map((nota) => (
                <tr key={nota.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '12px' }}>
                    {new Date(nota.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute:'2-digit' })}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{nota.fornecedor}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{nota.descricao}</td>
                  {/* <td style={{ padding: '12px' }}>
                    <span style={{ backgroundColor: '#e2e8f0', padding: '4px 8px', borderRadius: '12px', fontSize: '12px' }}>
                      {nota.categoria || 'Geral'}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#005c8a', fontWeight: 'bold' }}>
                    R$ {nota.valor.toFixed(2).replace('.', ',')}
                  </td> */}
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    {nota.urlAnexo ? (
                      <a href={nota.urlAnexo} target="_blank" rel="noopener noreferrer" style={{ color: '#005c8a', textDecoration: 'underline', fontSize: '14px', fontWeight: 'bold' }}>
                        Ver Foto
                      </a>
                    ) : (
                      <span style={{ color: '#aaa', fontSize: '12px' }}>—</span>
                    )}
                  </td>
                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{ 
                      backgroundColor: nota.status === 'Pendente' ? '#fef3c7' : '#d1fae5', 
                      color: nota.status === 'Pendente' ? '#b45309' : '#047857',
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      {nota.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
