import Link from 'next/link';

export default function ProviderStart() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-6">Join as a Pro</h1>
      <div className="w-full max-w-md flex flex-col items-center space-y-4">
        <Link href="/providerlogin" legacyBehavior>
          <a className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600">
            Log In
          </a>
        </Link>
        <Link href="/providerregister" legacyBehavior>
          <a className="w-full bg-green-500 text-white py-3 px-6 rounded-lg text-center hover:bg-green-600">
            Register
          </a>
        </Link>
      </div>
    </div>
  );
}
