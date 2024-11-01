import React, { Suspense } from 'react'
import "./globals.css";
import Topbar from "@/components/topbar";
import ThemeProvider from "./util/theme-provider";
import AuthProvider from "./util/auth-provider";

export const metadata = {
  title: "Panthai AI Doctor",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <AuthProvider>
            <ThemeProvider>
              <Topbar>
                {children}
              </Topbar>
            </ThemeProvider>
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}
