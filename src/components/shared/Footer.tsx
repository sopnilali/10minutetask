import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
          <Image
            width={500}
            height={500}
            src="https://cdn.10minuteschool.com/images/svg/10mslogo-svg.svg"
            alt="10 Minute School Logo"
            className="h-8 w-auto"
          />
        </div>
        <nav className="flex space-x-6 mb-4 md:mb-0">
          <a href="#" className="hover:text-green-400 transition-colors">About</a>
          <a href="#" className="hover:text-green-400 transition-colors">Courses</a>
          <a href="#" className="hover:text-green-400 transition-colors">Contact</a>
          <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
        </nav>
        <div className="flex space-x-4">
          <a href="https://facebook.com/10minuteschool" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg className="w-5 h-5 fill-current hover:text-green-400 transition-colors" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
          </a>
          <a href="https://youtube.com/10minuteschool" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg className="w-5 h-5 fill-current hover:text-green-400 transition-colors" viewBox="0 0 24 24">
              <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.163 3.5 12 3.5 12 3.5s-7.163 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.414 0 12 0 12s0 3.586.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.837 20.5 12 20.5 12 20.5s7.163 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.586 24 12 24 12s0-3.586-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>
          <a href="https://linkedin.com/company/10minuteschool" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg className="w-5 h-5 fill-current hover:text-green-400 transition-colors" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.76s.784-1.76 1.75-1.76 1.75.79 1.75 1.76-.784 1.76-1.75 1.76zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.38v4.59h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z"/>
            </svg>
          </a>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-6 text-center text-sm text-gray-400 bg-gray-900">
        &copy; {new Date().getFullYear()} 10 Minute School. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
