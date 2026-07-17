const { loadEnvConfig } = require('@next/env');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const cron = require('node-cron');

// Carrega as variáveis de ambiente (.env) da raiz do projeto
const projectDir = path.resolve(__dirname, '../');
loadEnvConfig(projectDir);

// Inicializa a conexão com o banco de forma idêntica ao site
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Configurações do WAHA
const WAHA_URL = process.env.WAHA_URL || 'http://localhost:8102';
const SESSAO_WAHA = 'default';

async function dispararLembretes() {
    console.log('[WAHA Lembretes] Iniciando varredura de lembretes às', new Date().toLocaleString('pt-BR'));
    
    try {
        const amanha = new Date();
        amanha.setDate(amanha.getDate() + 1);
        
        // Define o início e fim do dia de amanhã
        const inicioAmanha = new Date(amanha.getFullYear(), amanha.getMonth(), amanha.getDate(), 0, 0, 0);
        const fimAmanha = new Date(amanha.getFullYear(), amanha.getMonth(), amanha.getDate(), 23, 59, 59);

        const entrevistas = await prisma.entrevista.findMany({
            where: {
                dataHora: {
                    gte: inicioAmanha,
                    lte: fimAmanha
                },
                status: 'Agendada'
            },
            include: {
                membro: true
            }
        });

        console.log(`[WAHA Lembretes] Foram encontradas ${entrevistas.length} entrevistas marcadas para amanhã.`);

        for (const ev of entrevistas) {
            const membro = ev.membro;
            
            if (!membro.telefone) {
                console.log(`[WAHA Lembretes] Membro ${membro.nome} não possui telefone cadastrado. Ignorando.`);
                continue;
            }

            // Limpa o telefone mantendo apenas números
            let telefone = membro.telefone.replace(/\D/g, '');
            
            // Adiciona o DDI 55 (Brasil) caso o usuário não tenha colocado
            if (telefone.length === 10 || telefone.length === 11) {
                telefone = '55' + telefone;
            }

            // Formato exigido pelo WAHA (@c.us para contatos normais)
            const chatId = `${telefone}@c.us`;

            // Formata a data e hora para leitura amigável
            const dataFormatada = new Date(ev.dataHora).toLocaleDateString('pt-BR');
            const horaFormatada = new Date(ev.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            const mensagem = `Olá ${membro.nome}, a Paz! 🕊️\n\nEste é um lembrete automático da Secretaria.\nVocê tem uma entrevista de *${ev.tipo}* agendada para amanhã (*${dataFormatada}*) às *${horaFormatada}*.\n\nContamos com a sua presença! Se não puder comparecer, por favor avise a secretaria.`;

            console.log(`[WAHA Lembretes] Disparando para ${membro.nome} (${chatId})...`);

            try {
                const response = await fetch(`${WAHA_URL}/api/sendText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chatId: chatId,
                        text: mensagem,
                        session: SESSAO_WAHA
                    })
                });

                if (response.ok) {
                    console.log(`[WAHA Lembretes] ✅ Mensagem enviada com sucesso para ${membro.nome}!`);
                } else {
                    const errorText = await response.text();
                    console.error(`[WAHA Lembretes] ❌ Falha ao enviar para ${membro.nome}. Status: ${response.status} - ${errorText}`);
                }
            } catch (err) {
                console.error(`[WAHA Lembretes] ❌ Erro de rede ao conectar com WAHA (${WAHA_URL}):`, err.message);
            }
            
            // Pequena pausa (delay) de 2 segundos entre mensagens para evitar bloqueios do WhatsApp
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        console.log('[WAHA Lembretes] Varredura e envios finalizados com sucesso.');
    } catch (error) {
        console.error('[WAHA Lembretes] 🚨 Erro geral na execução:', error);
    }
}

// Configura o cron para rodar todos os dias às 08:00 AM (Fuso Horário de São Paulo)
cron.schedule('0 8 * * *', () => {
    dispararLembretes();
}, {
    timezone: "America/Sao_Paulo"
});

console.log('[WAHA Lembretes] Robô iniciado com sucesso!');
console.log(`[WAHA Lembretes] WAHA URL configurada: ${WAHA_URL}`);
console.log('[WAHA Lembretes] Aguardando silenciosamente. Disparos programados para todos os dias às 08:00 AM.');
