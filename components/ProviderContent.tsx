// components/ProviderContent.tsx
import Link from 'next/link';

const ProviderContent = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-8 bg-white bg-opacity-80 rounded-md shadow-lg md:w-3/2">
      <h1 className="text-4xl font-bold mb-2">Hey there, Pro!</h1>
      <h2 className="text-2xl mb-6">Check out some tips and best practices to grow your business.</h2>
      {/* Example cards for blog posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="font-bold text-lg mb-2">Blog Post Title 1</h3>
          <p className="text-gray-700 mb-4">Brief description of the blog post content...</p>
          <Link href="/blog-post-1">
            <span className="text-blue-500 hover:underline">Read More</span>
          </Link>
        </div>
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
          <h3 className="font-bold text-lg mb-2">Blog Post Title 2</h3>
          <p className="text-gray-700 mb-4">Brief description of the blog post content...</p>
          <Link href="/blog-post-2">
            <span className="text-blue-500 hover:underline">Read More</span>
          </Link>
        </div>
        {/* Add more cards as needed */}
      </div>
    </div>
  );
};

export default ProviderContent;
