import "./globals.css";

export const metadata = {
  title: "EveryDay-Eletro",
  description: "Produtos para seu dia a dia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
