import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <img
          src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
          alt="10 Minute School Logo"
          className="mx-auto mb-8 w-24 h-24"
        />
        <h1 className="text-5xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
