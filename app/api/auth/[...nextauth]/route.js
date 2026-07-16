import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Usuários fixos do dashboard (para login com credenciais locais)
const USERS = [
  { id: '1', name: 'Sandra Nakata', email: 'sandra.nakata092@gmail.com', password: '123', role: 'diretora', image: '/sandra.jpg' },
  { id: '2', name: 'Leonardo', email: 'leonardogmendoza@gmail.com', password: '123', role: 'diretora', image: '/leonardo.jpg' },
  { id: '3', name: 'Bispo', email: 'bispo', password: '123456', role: 'diretora', image: '/bispado-logo.jpg' },
  { id: '4', name: 'Vicente', email: 'vicente', password: '123456', role: 'diretora', image: '/bispado-logo.jpg' },
  { id: '5', name: 'Almir', email: 'almir', password: '123456', role: 'diretora', image: '/bispado-logo.jpg' },
];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || 'dummy-id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'dummy-secret',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Senha', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        // Remove espaços vazios do final e converte para minúsculas
        const emailDigitado = credentials.email.trim().toLowerCase();
        
        // 1. Verificar na lista de diretores fixos
        const user = USERS.find(u => u.email.toLowerCase() === emailDigitado);
        if (user && credentials.password === user.password) {
          return { id: user.id, name: user.name, email: user.email, role: user.role, image: user.image };
        }

        // 2. Verificar no banco de dados (se houver outros com senha)
        const dbUser = await prisma.user.findUnique({
          where: { email: emailDigitado } // Banco de dados já ignora se estiver configurado certo, mas mandamos minúsculo por segurança
        });

        if (dbUser) {
          const isValid = await bcrypt.compare(credentials.password, dbUser.password);
          if (isValid) {
            return {
              id: String(dbUser.id),
              name: dbUser.name,
              email: dbUser.email,
              role: dbUser.role
            };
          }
        }
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/dashboard/login',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        const allowedEmails = [
          'sandra.nakata092@gmail.com',
          'leonardogmendoza@gmail.com'
        ];

        if (allowedEmails.includes(user.email)) {
          user.role = 'diretora';
          return true;
        }

        const dbUser = await prisma.user.findUnique({
          where: { email: user.email }
        });

        if (dbUser) {
          user.role = dbUser.role;
          return true;
        }

        return false; 
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.image = user.image;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.image;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'bispado-dev-secret',
  session: { strategy: 'jwt' },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
