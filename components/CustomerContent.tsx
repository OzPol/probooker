// components/CustomerContent.tsx
import Link from 'next/link';

const CustomerContent = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-8 bg-white bg-opacity-80 rounded-md shadow-lg md:w-3/2">
      <h1 className="text-4xl font-bold mb-2">Looking for inspirations?!</h1>
      <h2 className="text-2xl mb-6">Check out our latest services and offers tailored just for you.</h2>
      <Link href="/popular-services">
        <span className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg text-center hover:bg-blue-600">
          View Popular Services in Your Area
        </span>
      </Link>
      {/* Add more customer-specific content or components here */}
    </div>
  );
};

export default CustomerContent;
