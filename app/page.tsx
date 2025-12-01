export default function Home() {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">OAuth Demo</h1>
          <a
            href="/api/auth/signin"
            className="bg-blue-600 text-white px-6 py-3
                       rounded-lg hover:bg-blue-700"
          >
            Sign In with OAuth
          </a>
        </div>
      </div>
    );
  }
  