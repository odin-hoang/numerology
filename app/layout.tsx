import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/footer";
import Header from "@/components/header";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tra cứu thần số học - Khai phá bản thân",
  description:
    "Bên trong mỗi người là một ánh sáng tuyệt vời đang chờ đợi để tỏa sáng, một linh hồn hùng vĩ đang khao khát được thể hiện.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Header />
        <div>{children}</div>
        <Toaster></Toaster>
        <Footer />
      </body>
    </html>
  );
}
