import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/app-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Protura ",
  description:
    "Protura is a self-service platform for small entrepreneurs who need to manage their business.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased dark`}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <div className="w-full">
            <div className="grid grid-rows-[var(--header-height)_auto] h-screen">
              <Header />
              <main className="h-full p-4">{children}</main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
