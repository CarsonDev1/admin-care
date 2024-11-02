'use client';
import { useAuth } from '@/contexts/AuthProvider';

export default async function Dashboard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  } else {
    window.location.href = '/dashboard/overview';
  }
}
