import AppSidebar from '@/components/layout/app-sidebar';
import { AuthProvider } from '@/contexts/AuthProvider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <AppSidebar>{children}</AppSidebar>
      </AuthProvider>
    </>
  );
}
