import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Head>
        <title>ProBooker</title>
        <meta name="description" content="ProBooker Service Marketplace" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="flex justify-between items-center bg-blue-500 p-4">
        <h1 className="text-xl font-bold text-white">ProBooker</h1>
        <a href="/login" className="text-white text-lg underline">Service Provider Log In</a>
      </header>

      <main className="flex flex-col justify-center items-center py-8">
        {/* Main content goes here */}
      </main>
    </div>
  );
}