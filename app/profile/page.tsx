'use client';
import { useSearchParams } from 'next/navigation';

export default function Profile() {
  const searchParams = useSearchParams();
  const userData = searchParams.get('data');
  
  if (!userData) {
    return <div>No user data</div>;
  }

  const user = JSON.parse(userData);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        {user.avatar_url && (
          <img src={user.avatar_url} alt="Avatar"
               className="w-24 h-24 rounded-full mb-4" />
        )}
        <p><strong>Name:</strong> {user.name || user.login}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <a href="/" className="text-blue-600 mt-4 block">
          Back to Home
        </a>
      </div>
    </div>
  );
}
