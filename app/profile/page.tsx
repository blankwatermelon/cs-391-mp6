'use client';

import { useEffect, useState } from 'react';
import { ProfileCard } from '@/app/components/ProfileCard';

interface GitHubUser {
  name?: string;
  login?: string;
  avatar_url?: string;
}

export default function Profile() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/user')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <ProfileCard user={user} />
    </div>
  );
}