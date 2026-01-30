import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import React from 'react';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FirebaseClientProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <React.Suspense fallback={null}>
          <Header />
        </React.Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </FirebaseClientProvider>
  );
}
