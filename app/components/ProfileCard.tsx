interface GitHubUser {
    name?: string;
    login?: string;
    avatar_url?: string;
  }
  
  interface ProfileCardProps {
    user: GitHubUser;
  }
  
  export function ProfileCard({ user }: ProfileCardProps) {
    const displayName = user.name || user.login || 'User';
    const initial = displayName[0].toUpperCase();
  
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="h-32 bg-blue-600" />
          
          {/* Avatar */}
          <div className="flex justify-center -mt-16 mb-4">
            {user.avatar_url ? (
              <img 
                src={user.avatar_url} 
                alt={`${displayName}'s avatar`}
                className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-blue-500 flex items-center justify-center">
                <span className="text-4xl text-white font-bold">
                  {initial}
                </span>
              </div>
            )}
          </div>
  
          <div className="px-8 pb-8">
            {/* Name */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {displayName}
              </h1>
              {user.login && user.name && (
                <p className="text-gray-500">@{user.login}</p>
              )}
            </div>
  
            {/* Back Button */}
            <a 
              href="/" 
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
  
        <p className="text-center mt-6 text-gray-500 text-sm">
          Authenticated via OAuth 2.0
        </p>
      </div>
    );
  }