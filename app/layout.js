import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-main",
  subsets: ["latin"],
});

export const metadata = {
  title: "Controle do Bispado | Painel de Gestão",
  description: "Sistema oficial para gestão de atividades do bispado, incluindo Notas Fiscais, Missão, Rapazes e Moças.",
  manifest: "/manifest.json",
  icons: {
    icon: "/bispado-logo.jpg",
    apple: "/bispado-logo.jpg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bispado",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
