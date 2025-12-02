'use client';
import { useSearchParams } from 'next/navigation';
import { ProfileCard } from '@/app/components/ProfileCard';

export default function Profile() {
  const searchParams = useSearchParams();
  const userData = searchParams.get('data');
  
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-gray-600 text-lg">No user data found</p>
          <a 
            href="/" 
            className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  const user = JSON.parse(userData);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <ProfileCard user={user} />
    </div>
  );
}