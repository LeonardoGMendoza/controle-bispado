process.env.DATABASE_URL = "postgresql://postgres:bispado_senha_123@187.77.32.137:5454/bispado_db?schema=public";
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({});

const data = `Arcanjo Teles, Augusto Henrique	M	16	20 set 2009	(11) 99307-5210
Arcanjo Teles, Rafael Augusto	M	12	15 dez 2013	(11) 99307-5210
Arcanjo Teles, Rodrigo Augusto	M	13	6 ago 2012	(11) 99307-5210
Atahuachi Ortiz, Jennifer Lucia	F	15	20 jun 2011	(11) 99490-0655
Atahuachi Ortiz, Leonela Mayrin	F	18	5 fev 2008	(11) 99490-0655
Barros, Guilherme Pereira de	M	16	3 mai 2010	(11) 95455-4932
Barros, Matheus Pereira de	M	13	21 fev 2013	
Bracho Ledezma, Jeremias Joel	M	13	4 set 2012	(42) 4963-1983
Bracho Ledezma, Xiara Clarisa	F	12	21 jan 2014	
Costa, Leonardo Soares	M	17	10 fev 2009	
de Lima, Emanuela Núria Moreira	F	13	5 out 2012	(11) 98398-2114
dos Santos, Claryssa Geovana Rodrigues	F	17	11 out 2008	(11) 98398-2114
Dos Santos, Paulo Henrique	M	16	24 mai 2010	(11) 95404-2343
Gomes Alves Pereira, Nicolly	F	14	15 abr 2012	(11) 95488-4998
Jesus, Roberto Junior Teixeira de	M	15	22 jun 2011	
Magnavita, Gustavo Silva Lopes	M	17	14 ago 2008	(11) 2053-1634
Morais, Heloísa Santiago	F	12	25 dez 2013	(11) 99751-2831
Pachuri Velez, Romina	F	14	14 jan 2012	(11) 97876-5007
Pachuri Velez, Valéria	F	12	4 nov 2013	
Ribeiro, Davi de Carvalho	M	13	6 fev 2013	
Rincón Maurera, Jonathan Mosíah	M	17	21 jul 2008	(11) 95956-0584
Russo, Maria Izabelly Lima	F	15	29 mar 2011	(11) 91505-7613
Sabino, Henrique Alves	M	15	27 out 2010	(11) 95493-2402
Santos, Yasmin Barbosa	F	13	12 jun 2013	(11) 95204-5307
Silva Freitas, William	M	13	12 out 2012	(17) 99223-3405
Silva, Julia Hagata Lopes da	F	17	27 mar 2009	
Sousa, Leticia Cleto de	F	18	18 jun 2008`;

const meses = {
  'jan': '01', 'fev': '02', 'mar': '03', 'abr': '04', 'mai': '05', 'jun': '06',
  'jul': '07', 'ago': '08', 'set': '09', 'out': '10', 'nov': '11', 'dez': '12'
};

async function main() {
  const lines = data.split('\n');
  let count = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    
    const parts = line.split('\t');
    const nomeOriginal = parts[0].trim();
    // Inverter "Sobrenome, Nome" para "Nome Sobrenome"
    let nome = nomeOriginal;
    if (nomeOriginal.includes(',')) {
      const [sobrenome, primeiroNome] = nomeOriginal.split(',');
      nome = `${primeiroNome.trim()} ${sobrenome.trim()}`;
    }

    const sexo = parts[1] ? parts[1].trim() : 'M';
    const organizacao = sexo === 'F' ? 'Moças' : 'Rapazes';
    
    // Parse Date: "20 set 2009"
    const dataString = parts[3] ? parts[3].trim() : '';
    let dataNascimento = null;
    if (dataString) {
      const dParts = dataString.split(' ');
      if (dParts.length === 3) {
        const dia = dParts[0].padStart(2, '0');
        const mes = meses[dParts[1].toLowerCase()] || '01';
        const ano = dParts[2];
        dataNascimento = new Date(`${ano}-${mes}-${dia}T12:00:00Z`);
      }
    }

    // Parse Phone
    let telefone = parts[4] ? parts[4].replace(/\D/g, '') : null;
    if (telefone && telefone.length > 0) {
      if (!telefone.startsWith('55')) {
        telefone = '55' + telefone;
      }
    } else {
      telefone = null;
    }

    await prisma.jovem.create({
      data: {
        nome,
        telefone,
        organizacao,
        dataNascimento,
        status: 'Ativo',
        cargo: 'VAGO'
      }
    });
    count++;
  }
  
  console.log(`Importação concluída! ${count} jovens inseridos no banco de dados de produção.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
