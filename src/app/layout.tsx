import type { Metadata } from "next";
import DefaultLayout from "@/layout/layout";
import "./globals.css";
import { Providers } from "./providers";


export const metadata: Metadata = {
  title: "Core test",
  description: "Prueba tecnica Intercorp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className='light'>
      <body

      >
        <Providers>
          <DefaultLayout>
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </DefaultLayout>
        </Providers>
      </body>
    </html>
  );
}
